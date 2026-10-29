// Отправка целей в Яндекс.Метрику. Цели нужно создать в интерфейсе Метрики
// (тип «JavaScript-событие») с идентификаторами: form_submit, phone_click, messenger_click, email_click, calc_use
declare global {
  interface Window { ym?: (...args: unknown[]) => void; __ymId?: string }
}

export function reachGoal(goal: string) {
  if (window.ym && window.__ymId) window.ym(Number(window.__ymId), 'reachGoal', goal);
}
