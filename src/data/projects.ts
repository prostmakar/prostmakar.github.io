// ============================================================
//  ПРОЕКТЫ — выполненные работы и собственная продукция
//  status: 'done' — выполненный проект, 'soon' — своя продукция «скоро»
//  TODO: заменить примеры на реальные проекты
// ============================================================
import type { ImageMetadata } from 'astro';
import weldingFrames from '../assets/photos/welding-frames.jpg';
import assembly from '../assets/photos/assembly.jpg';
import turningManual from '../assets/photos/turning-manual.jpg';
import millingVmc from '../assets/photos/milling-vmc1200.jpg';
import laserTube from '../assets/photos/laser-tube.jpg';
import shopOverview from '../assets/photos/shop-overview.jpg';

export interface Project {
  title: string;
  status: 'done' | 'soon';
  category: string;
  image: ImageMetadata;
  task: string;
  solution: string;
  result?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Серия сварных рам для оборудования',
    status: 'done',
    category: 'Металлоконструкции',
    image: weldingFrames,
    task: 'Изготовить партию одинаковых сварных рам с точной геометрией посадочных мест.',
    solution: 'Лазерная резка листа и трубы, сборка в кондукторе, полуавтоматическая сварка, контроль геометрии.',
    result: 'Партия передана заказчику в срок, рамы собираются без подгонки.',
    tags: ['лазерная резка', 'сварка', 'серия'],
  },
  {
    title: 'Кронштейны и опорные узлы',
    status: 'done',
    category: 'Металлоконструкции',
    image: assembly,
    task: 'Опорные кронштейны из листовой стали с ребрами жёсткости под крепёж.',
    solution: 'Раскрой на лазере, сверление и слесарная доработка, сварка узлов.',
    tags: ['лазерная резка', 'слесарные работы'],
  },
  {
    title: 'Втулки и кольца серией',
    status: 'done',
    category: 'Механообработка',
    image: turningManual,
    task: 'Партия втулок и колец с допуском по посадочным диаметрам.',
    solution: 'Ленточнопильная заготовка, токарная обработка на ЧПУ, выборочный контроль.',
    tags: ['токарные работы', 'серия'],
  },
  {
    title: 'Корпусные детали на обрабатывающем центре',
    status: 'done',
    category: 'Механообработка',
    image: millingVmc,
    task: 'Фрезерные корпусные детали с карманами и резьбовыми отверстиями.',
    solution: 'Программирование по 3D-модели, обработка на VMC1200 за минимальное число установок.',
    tags: ['фрезерные работы', 'ЧПУ'],
  },
  {
    title: 'Собственная продукция ДС-Металл',
    status: 'soon',
    category: 'Своя продукция',
    image: laserTube,
    task: 'Готовим к запуску линейку изделий собственного производства.',
    solution: 'Подробности и характеристики появятся здесь в ближайшее время.',
    tags: ['скоро'],
  },
  {
    title: 'Металлоизделия под заказ серийно',
    status: 'soon',
    category: 'Своя продукция',
    image: shopOverview,
    task: 'Каталог типовых изделий, которые можно заказать без разработки чертежа.',
    solution: 'Следите за обновлениями или оставьте заявку — сообщим о старте.',
    tags: ['скоро'],
  },
];
