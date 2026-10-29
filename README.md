# Сайт ДС-Металл (dsmet.by)

Сделан на [Astro](https://astro.build). На выходе получается обычный статичный HTML: быстрый, хорошо индексируется Яндексом и работает на любом хостинге.

## Как посмотреть сайт в VS Code

1. `Ctrl+Shift+B` запускает сайт (задача «Сайт: запустить»).
2. `Ctrl+Shift+P` → **Simple Browser: Show** → `http://localhost:4321`.
3. Правьте любой файл: после сохранения страница обновится сама.

## Где что менять

| Что | Файл |
|---|---|
| Телефоны, почта, адрес, мессенджеры, цифры, **номер Яндекс.Метрики** | `src/data/site.ts` |
| Услуги: тексты, характеристики, фото, SEO | `src/data/services.ts` |
| Цены и ставки калькулятора | `src/data/prices.ts` |
| Оборудование | `src/data/equipment.ts` |
| Проекты и своя продукция | `src/data/projects.ts` |
| «Как мы работаем» и вопросы-ответы | `src/data/faq.ts` |
| Пункты меню | `src/data/nav.ts` |
| Цвета, шрифты, кнопки | `src/styles/global.css` |
| Фото | `src/assets/photos/` (галерея подхватывает их автоматически) |
| Обработчик заявок (Telegram + почта) | `functions/send.js` |

Новая услуга — это новая запись в `services.ts`. Страница, карточка на главной и пункт меню появятся сами.

## Публикация (Cloudflare Pages)

```
npm run deploy
```

Команда собирает сайт и выкладывает его на Cloudflare, обновление появляется примерно через минуту. Цикл правки: изменили текст в VS Code → проверили на localhost → `npm run deploy`.

### Настройка заявок (один раз)

Cloudflare → Workers & Pages → dsmet → Settings → Variables and Secrets:

- `TELEGRAM_TOKEN`: токен бота от @BotFather.
- `TELEGRAM_CHAT_ID`: id чата. Добавьте бота в группу, отправьте сообщение и откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates`.
- По желанию, для дублирования заявок на почту: `RESEND_API_KEY` (ключ с resend.com), `MAIL_TO`, `MAIL_FROM`.

После добавления переменных выполните `npm run deploy` ещё раз.

### Подключение домена dsmet.by

Cloudflare → проект dsmet → Custom domains → `dsmet.by`. Cloudflare подскажет, какие DNS-записи поменять у регистратора домена. Пока домен не подключён, сайт доступен по адресу `dsmet.pages.dev`; этот адрес закрыт от индексации.

## Яндекс.Метрика

Впишите номер счётчика в `metrikaId` в файле `src/data/site.ts`. Затем создайте в Метрике цели типа «JavaScript-событие»:
`form_submit` (заявка), `phone_click`, `email_click`, `messenger_click`, `calc_use`.
