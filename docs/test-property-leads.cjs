// Run: node docs/test-property-leads.cjs. All email and analytics calls are mocked.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies, globals = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: (id) => {
    if (!(id in dependencies)) throw new Error(`Unexpected dependency: ${id}`);
    return dependencies[id];
  }, console: { error() {} }, ...globals }, { filename: file });
  return exports;
}

(async () => {
  const emails = [];
  let failEmail = false;
  const route = load('app/api/seller-lead/route.ts', {
    'node:crypto': require('node:crypto'),
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    resend: { Resend: class { emails = { send: async (message) => {
      emails.push(message);
      return failEmail ? { error: { message: 'Mock delivery failure' } } : { data: { id: 'mock' } };
    } }; } },
  }, { process: { env: { SELLER_LEAD_TO: 'test@example.invalid', RESEND_API_KEY: 'mock-only' } } });
  let requestId = 0;
  const payload = { name: 'Test Owner', phone: '05550000000', district: 'Karşıyaka', property_type: 'Daire', sale_time: '1–3 ay içinde', preferred_time: '09:00–12:00', consent_terms: true, form_started_at: Date.now() - 10_000, event_id: 'test' };
  async function post(changes) {
    return route.POST(new Request('http://localhost/api/seller-lead', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `test-${++requestId}` }, body: JSON.stringify({ ...payload, ...changes }) }));
  }
  for (const [intent, label] of [['sell', 'Satış'], ['rent', 'Kiraya Verme'], [undefined, 'Satış']]) {
    assert.equal((await post({ property_intent: intent })).status, 200);
    const email = emails.at(-1);
    assert.ok(email.subject.includes(label));
    assert.ok(email.html.includes(`Yeni ${label} Görüşmesi Talebi`));
    assert.ok(email.html.includes(`${label} Zamanı`));
  }
  const sent = emails.length;
  for (const intent of ['', null, 'buy', '<script>', {}]) {
    assert.equal((await post({ property_intent: intent })).status, 400);
  }
  assert.equal((await post({ property_intent: 'rent', consent_terms: false })).status, 400);
  assert.equal(emails.length, sent, 'Invalid requests must not send email');
  failEmail = true;
  assert.equal((await post({ property_intent: 'rent' })).status, 500);

  const calls = [];
  const env = {};
  const window = { dataLayer: [], gtag: (...args) => calls.push(args), fbq: (...args) => calls.push(args) };
  const marketing = load('lib/marketing.ts', {}, { window, process: { env } });
  marketing.trackSellerLead('sale-id', 'Daire', 'Karşıyaka');
  assert.equal(window.dataLayer.at(-1).lead_type, 'property_seller');
  assert.ok(calls.some((call) => call[1] === 'conversion' && call[2].send_to.endsWith('/8WT-CIy-pegcEIed8MI-')));
  calls.length = 0;
  marketing.trackSellerLead('rent-id', 'Daire', 'Karşıyaka', 'rent');
  assert.equal(window.dataLayer.at(-1).event, 'landlord_lead_submit_success');
  assert.equal(window.dataLayer.at(-1).lead_type, 'property_landlord');
  assert.ok(calls.some((call) => call[1] === 'generate_lead' && call[2].property_intent === 'rent'));
  assert.ok(!calls.some((call) => call[1] === 'conversion'), 'Rent must not fire the sales conversion');
  env.NEXT_PUBLIC_GOOGLE_ADS_LANDLORD_LEAD_LABEL = 'rental-test';
  calls.length = 0;
  marketing.trackSellerLead('rent-id-2', 'Daire', 'Karşıyaka', 'rent');
  assert.ok(calls.some((call) => call[1] === 'conversion' && call[2].send_to.endsWith('/rental-test')));
  console.log('PASS: sales/rental email routing, legacy sales, validation, delivery failure, and separate conversion tracking.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
