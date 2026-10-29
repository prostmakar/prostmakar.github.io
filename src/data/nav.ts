// Меню сайта (шапка и подвал)
import { services } from './services';

export interface NavItem { label: string; href: string; children?: { label: string; href: string }[] }

export const nav: NavItem[] = [
  {
    label: 'Услуги',
    href: '/services/',
    children: services.map((s) => ({ label: s.title, href: `/${s.slug}/` })),
  },
  { label: 'Цены', href: '/prices/' },
  { label: 'Оборудование', href: '/equipment/' },
  { label: 'Проекты', href: '/projects/' },
  {
    label: 'Компания',
    href: '/company/',
    children: [
      { label: 'О компании', href: '/company/' },
      { label: 'Как мы работаем', href: '/faq/' },
      { label: 'Фотогалерея', href: '/galery/' },
    ],
  },
  { label: 'Контакты', href: '/contact/' },
];
