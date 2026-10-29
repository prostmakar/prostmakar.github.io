// ============================================================
//  Обработчик заявок (Cloudflare Pages Function, адрес /send).
//  Отправляет заявку и файлы в Telegram, копию — на почту (через Resend).
//
//  Настройки задаются в панели Cloudflare → Pages → проект → Settings → Variables and Secrets:
//    TELEGRAM_TOKEN    — токен бота от @BotFather
//    TELEGRAM_CHAT_ID  — id чата/группы, куда слать заявки
//    RESEND_API_KEY    — (необязательно) ключ resend.com для отправки на почту
//    MAIL_TO           — (необязательно) куда слать письма, например order@dsmet.by
//    MAIL_FROM         — (необязательно) от кого, например «ДС-Металл <site@dsmet.by>»
// ============================================================

const ALLOWED = ['dxf', 'dwg', 'step', 'stp', 'igs', 'iges', 'x_t', 'pdf', 'jpg', 'jpeg', 'png', 'zip', 'rar', '7z'];
const MAX_FILES = 5;
const MAX_SIZE = 20 * 1024 * 1024;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

const clean = (v, max = 2000) => String(v ?? '').replace(/<[^>]*>/g, '').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'bad form' }, 400);
  }

  // Антиспам: скрытое поле должно быть пустым
  if (form.get('website')) return json({ ok: true });

  const name = clean(form.get('name'), 100);
  const phone = clean(form.get('phone'), 40);
  const email = clean(form.get('email'), 120);
  const service = clean(form.get('service'), 120);
  const message = clean(form.get('message'), 3000);
  const page = clean(form.get('page'), 300);

  if (phone.replace(/\D/g, '').length < 7) return json({ ok: false, error: 'phone' }, 422);

  const files = form
    .getAll('files[]')
    .filter((f) => typeof f === 'object' && f.size > 0 && f.size <= MAX_SIZE)
    .filter((f) => ALLOWED.includes(f.name.split('.').pop().toLowerCase()))
    .slice(0, MAX_FILES);

  const text = [
    '🔔 Новая заявка с сайта dsmet.by',
    '',
    `Имя: ${name || '—'}`,
    `Телефон: ${phone}`,
    `E-mail: ${email || '—'}`,
    `Услуга: ${service || '—'}`,
    `Задача: ${message || '—'}`,
    `Файлов: ${files.length}`,
    `Страница: ${page}`,
  ].join('\n');

  let sent = false;

  // ---------- Telegram ----------
  if (env.TELEGRAM_TOKEN && env.TELEGRAM_CHAT_ID) {
    const api = `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}`;
    const res = await fetch(`${api}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
    });
    sent = res.ok || sent;
    for (const f of files) {
      const fd = new FormData();
      fd.append('chat_id', env.TELEGRAM_CHAT_ID);
      fd.append('document', f, f.name);
      await fetch(`${api}/sendDocument`, { method: 'POST', body: fd });
    }
  }

  // ---------- E-mail через Resend ----------
  if (env.RESEND_API_KEY && env.MAIL_TO) {
    const attachments = await Promise.all(
      files.map(async (f) => {
        const bytes = new Uint8Array(await f.arrayBuffer());
        let bin = '';
        for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
        return { filename: f.name, content: btoa(bin) };
      }),
    );
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.MAIL_FROM || 'ДС-Металл <onboarding@resend.dev>',
        to: env.MAIL_TO.split(',').map((s) => s.trim()),
        reply_to: email || undefined,
        subject: `Заявка с сайта: ${service || 'расчёт'} — ${phone}`,
        text,
        attachments,
      }),
    });
    sent = res.ok || sent;
  }

  return sent ? json({ ok: true }) : json({ ok: false, error: 'not sent' }, 500);
}
