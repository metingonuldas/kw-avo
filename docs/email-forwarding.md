# Gelen e-posta yönlendirmesi

Kural: `iletisim@kwavo.net` → `alestaviyaorsa@gmail.com`.
Diğer alıcılar yok sayılır. İmzalı `email.received` olayları işlenir.

## Kurulum

1. Resend'de `kwavo.net` için Receiving ve MX doğrulaması tamamlanmış olmalı.
2. Resend API Keys altında gelen e-postaları okuma ve gönderme yetkili bir anahtar
   oluşturun (Sending access anahtarı yeterli değildir; Full access gerekir).
3. Vercel / kw-avo / Settings / Environment Variables / Production altında
   `RESEND_INBOUND_API_KEY` olarak bu anahtarı kaydedin.
   Mevcut `RESEND_API_KEY` gönderim anahtarını değiştirmeyin.
4. Resend / Webhooks altında endpoint olarak
   `https://www.kwavo.net/api/resend/inbound`, olay olarak `email.received` seçin.
5. Webhook Signing Secret değerini Vercel Production ortamına
   `RESEND_INBOUND_WEBHOOK_SECRET` olarak ekleyin ve yeniden deploy edin.
6. Harici bir adresten `iletisim@kwavo.net` adresine ek içeren bir test e-postası
   gönderin. Resend webhook tesliminde 200, Gmail'de içerik ve ekleri doğrulayın.

## Davranış

Ham e-posta ayrıştırılarak orijinal içerik ve ekler korunur.
Reply-To, orijinal Reply-To adresine veya asıl gönderene ayarlanır.
Resend'in 24 saatlik idempotency penceresinde aynı gelen e-posta kimliği için
tekrar gönderimler tekilleştirilir. Daha eski olayların manuel replay edilmesi
yeniden mail gönderebilir. API hataları 502 ile webhook tekrar denemesini sağlar.
Eksik yapılandırma 503; geçersiz veya süresi geçmiş imza 400 döndürür.
Bu kurulum Gmail'den kurumsal adres adına gönderim yapılandırmaz.

Kaynak: https://resend.com/docs/dashboard/receiving/forward-emails
