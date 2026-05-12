import { Component, computed, signal } from '@angular/core';

type PortfolioCategory = 'brand' | 'events' | 'web';
type PortfolioFilter = 'all' | PortfolioCategory;
type PortfolioSectionType = 'dual' | 'featureGrid' | 'banner' | 'dualWithBanner';
type PortfolioTileType = 'image' | 'text';

interface PortfolioFilterOption {
  value: PortfolioFilter;
  label: string;
}

interface PortfolioTile {
  type: PortfolioTileType;
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface PortfolioSection {
  id: string;
  type: PortfolioSectionType;
  categories: PortfolioCategory[];
  tiles: PortfolioTile[];
}

const FILTER_OPTIONS: ReadonlyArray<PortfolioFilterOption> = [
  { value: 'all', label: 'Visi' },
  { value: 'brand', label: 'Firminis stilius' },
  { value: 'events', label: 'Renginiai' },
  { value: 'web', label: 'Web dizainas' },
];

const PORTFOLIO_SECTIONS: ReadonlyArray<PortfolioSection> = [
  {
    id: 'renatus',
    type: 'featureGrid',
    categories: ['web'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/portfolio/renatus/renatus_1.png',
        alt: 'Renatus interjero objektu paieskos projekto vizualas',
      },
      {
        type: 'image',
        image: 'public/photos/portfolio/renatus/renatus_2.png',
        alt: 'Mobilus svetaines ekranas',
      },
      {
        type: 'image',
        image: 'public/photos/portfolio/renatus/renatus_3.png',
        alt: 'Mobilus svetaines ekranas su kortelemis',
      },
      {
        type: 'text',
        title: "DIZAINO SAVAITE '26",
        description: 'Renginio vizualine komunikacija, socialiniu tinklu vizualai ir reklama.',
      }
    ],
  },
  {
    id: 'laisvalaikio-svetaine',
    type: 'dual',
    categories: ['web'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/aidai/aidai_2.png',
        alt: 'Svetaines dizaino pristatymo plakatas',
      },
      {
        type: 'image',
        image: 'public/photos/kupiskio/kupiskio_1.png',
        alt: 'Svetaines maketas kompiuterio ekrane',
      },
    ],
  },
  {
    id: 'dizaino-savaite',
    type: 'dualWithBanner',
    categories: ['events'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/aidai/aidai_1.png',
        alt: 'Renginio komunikacijos vizualas',
      },
      {
        type: 'image',
        image: 'public/photos/aidai/aidai_3.png',
        alt: 'Renginio plakato detalus vaizdas',
      },
      {
        type: 'image',
        image: 'public/photos/aidai.png',
        alt: 'Renginio plakato maketas',
      },
    ],
  },
  {
    id: 'urban-sushi',
    type: 'dual',
    categories: ['brand', 'events'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/poster/poster_2.png',
        alt: 'Brando plakato vizualas',
      },
      {
        type: 'image',
        image: 'public/photos/poster/poster_3.jpg',
        alt: 'Firminio stiliaus plakato maketas',
      },
    ],
  },
  {
    id: 'brand-banner',
    type: 'banner',
    categories: ['brand'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/Phones-horizontal.png',
        alt: 'Platus firminio pristatymo maketas',
      },
    ],
  },
  {
    id: 'vaisiu-amzius',
    type: 'featureGrid',
    categories: ['brand'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/vaisiai.png',
        alt: 'Vaisiu amziaus firminio stiliaus pristatymas',
      },
      {
        type: 'image',
        image: 'public/photos/vaisiai/vaisiai_1.png',
        alt: 'Firminio stiliaus elementas',
      },
      {
        type: 'image',
        image: 'public/photos/vaisiai/vaisiai_2.png',
        alt: 'Firminio stiliaus elementas',
      },
      {
        type: 'image',
        image: 'public/photos/vaisiai/vaisiai_3.png',
        alt: 'Firminio stiliaus elementas',
      },
      {
        type: 'image',
        image: 'public/photos/vaisiai/vaisiai_4.png',
        alt: 'Firminio stiliaus adaptacija',
      },
    ],
  },
  {
    id: 'web-showcase',
    type: 'banner',
    categories: ['web'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/kupiskio/kupiskio_2.png',
        alt: 'Platus svetaines pristatymo maketas',
      },
    ],
  },
];

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class Portfolio {
  readonly filters = FILTER_OPTIONS;
  readonly sections = PORTFOLIO_SECTIONS;
  readonly activeFilter = signal<PortfolioFilter>('all');
  readonly visibleSections = computed(() => {
    const filter = this.activeFilter();

    if (filter === 'all') {
      return this.sections;
    }

    return this.sections.filter((section) => section.categories.includes(filter));
  });

  setFilter(filter: PortfolioFilter) {
    this.activeFilter.set(filter);
  }
}
