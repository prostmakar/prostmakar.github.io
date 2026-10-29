// ============================================================
//  ОБОРУДОВАНИЕ — карточки на странице /equipment/
//  TODO: уточнить модели, количество и характеристики
// ============================================================
import type { ImageMetadata } from 'astro';
import laserSheet from '../assets/photos/laser-sheet.jpg';
import laserTube from '../assets/photos/laser-tube-2.jpg';
import millingVmc from '../assets/photos/milling-vmc1200.jpg';
import millingWb from '../assets/photos/milling-wb630.jpg';
import turningCnc from '../assets/photos/turning-cnc.jpg';
import turningManual from '../assets/photos/turning-manual-2.jpg';
import weldingArea from '../assets/photos/welding-area.jpg';
import shopTop from '../assets/photos/shop-top.jpg';

export interface Equipment {
  group: string;
  name: string;
  image: ImageMetadata;
  specs: [string, string][];
  service?: string; // slug связанной услуги
}

export const equipment: Equipment[] = [
  {
    group: 'Лазерная резка',
    name: 'Оптоволоконный лазер VMADE CNC',
    image: laserSheet,
    specs: [
      ['Рабочее поле', '2000 × 6000 мм'],
      ['Толщина стали', 'до 50 мм'],
      ['Материалы', 'сталь, нержавейка, алюминий, медь, латунь'],
    ],
    service: 'lazernaya_rezka_metalla',
  },
  {
    group: 'Лазерная резка',
    name: 'Лазерный труборез VMADE',
    image: laserTube,
    specs: [
      ['Круглая труба', 'до Ø220 мм'],
      ['Длина заготовки', 'до 6000 мм'],
      ['Точность', '±0,05 мм'],
    ],
    service: 'lazernaya_rezka_trub',
  },
  {
    group: 'Фрезерная обработка',
    name: 'Вертикальный обрабатывающий центр VMC1200',
    image: millingVmc,
    specs: [
      ['Тип', 'вертикально-фрезерный центр с ЧПУ'],
      ['Оси', '3 + поворотная 4-я ось'],
      ['Точность', '0,01 мм'],
    ],
    service: 'frezernye_raboty',
  },
  {
    group: 'Фрезерная обработка',
    name: 'Обрабатывающий центр WB630',
    image: millingWb,
    specs: [
      ['Тип', 'вертикально-фрезерный центр с ЧПУ'],
      ['Оснастка', 'поворотный стол, тиски'],
      ['Назначение', 'серийные детали'],
    ],
    service: 'frezernye_raboty',
  },
  {
    group: 'Токарная обработка',
    name: 'Токарные станки с ЧПУ TCK46D-8 и др.',
    image: turningCnc,
    specs: [
      ['Станина', 'наклонная'],
      ['Диаметр обработки', 'до Ø400 мм'],
      ['Управление', 'Siemens / GSK'],
    ],
    service: 'tokarnye_raboty',
  },
  {
    group: 'Токарная обработка',
    name: 'Универсальные токарные станки',
    image: turningManual,
    specs: [
      ['Назначение', 'единичные детали, ремонт, нарезание резьб'],
      ['Работа', 'по чертежу и по образцу'],
    ],
    service: 'tokarnye_raboty',
  },
  {
    group: 'Сварка',
    name: 'Сварочный участок',
    image: weldingArea,
    specs: [
      ['Виды сварки', 'TIG, MIG/MAG, MMA, лазерная'],
      ['Оснащение', 'сварочные столы, вытяжка, кондукторы'],
    ],
    service: 'svarochnye_raboty',
  },
  {
    group: 'Заготовительный участок',
    name: 'Ленточнопильные станки',
    image: shopTop,
    specs: [
      ['Диаметр', 'до Ø400 мм'],
      ['Длина заготовки', 'до 6000 мм'],
      ['Резка', 'под 90° и под углом'],
    ],
    service: 'lentochnopilnaya',
  },
];
