// Run: node docs/test-email-forwarding.cjs (no network or real email)
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { createHmac } = require('node:crypto');
const ts = require('typescript');
const { Resend } = require('resend');
const verifier = new Resend('test').webhooks;
const secret = Buffer.from('test-signing-secret-32-bytes-long!').toString('base64');
const env = { RESEND_INBOUND_API_KEY: 'test', RESEND_INBOUND_WEBHOOK_SECRET: `whsec_${secret}` };
let sends = [], reads = 0, fail = false;
class FakeResend {
  webhooks = verifier;
  emails = {
    receiving: { get: async () => {
      reads++;
      return { data: { from: 'sender@example.com', reply_to: ['reply@example.com'], subject: 'Test', raw: { download_url: 'https://example.com/raw' } } };
    } },
    send: async (email, options) => {
      sends.push({ email, options });
      return fail ? { error: { name: 'rate_limit_exceeded' } } : { data: { id: 'sent' } };
    },
  };
}
const mime = 'MIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary="test"\r\n\r\n--test\r\nContent-Type: text/plain\r\n\r\nHello\r\n--test\r\nContent-Type: image/png\r\nContent-Disposition: inline; filename="logo.png"\r\nContent-ID: <logo>\r\nContent-Transfer-Encoding: base64\r\n\r\naGVsbG8=\r\n--test--';
const output = ts.transpileModule(fs.readFileSync('app/api/resend/inbound/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const context = { exports: {}, require: name => name === 'resend' ? { Resend: FakeResend } : require(name),
  process: { env }, console: { error() {} }, AbortSignal,
  fetch: async () => new Response(mime),
};
vm.runInNewContext(output, context);
function request(to = ['iletisim@kwavo.net'], valid = true, timestamp = Math.floor(Date.now()/1000)) {
  const body = JSON.stringify({ type: 'email.received', data: { email_id: 'email-123', to } });
  const signature = createHmac('sha256', Buffer.from(secret, 'base64')).update(`msg_test.${timestamp}.${body}`).digest('base64');
  return new Request('https://example.com/api/resend/inbound', { method: 'POST', body, headers: {
    'svix-id': 'msg_test', 'svix-timestamp': String(timestamp), 'svix-signature': valid ? `v1,${signature}` : 'invalid',
  } });
}
(async () => {
  const post = context.exports.POST;
  assert.equal((await post(request(undefined, false))).status, 400);
  assert.equal((await post(request(undefined, true, 1))).status, 400);
  assert.equal(reads, 0);
  assert.equal((await post(request(['other@kwavo.net']))).status, 200);
  assert.equal(reads, 0);
  assert.equal((await post(request())).status, 200);
  assert.equal(sends.length, 1);
  assert.equal(sends[0].email.to, 'alestaviyaorsa@gmail.com');
  assert.equal(sends[0].email.replyTo[0], 'reply@example.com');
  assert.equal(sends[0].email.attachments[0].content, 'aGVsbG8=');
  assert.equal(sends[0].email.attachments[0].contentId, 'logo');
  await post(request());
  assert.equal(sends[0].options.idempotencyKey, sends[1].options.idempotencyKey);
  fail = true;
  assert.equal((await post(request())).status, 502);
  delete env.RESEND_INBOUND_WEBHOOK_SECRET;
  assert.equal((await post(request())).status, 503);
  console.log('PASS: signature, expired signature, recipient filter, destination, reply-to, attachment, inline CID, stable idempotency key, upstream failure, missing config');
})().catch(error => { console.error(error); process.exitCode = 1; });
