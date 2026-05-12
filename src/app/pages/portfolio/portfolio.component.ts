import { Component, computed, signal } from '@angular/core';

type PortfolioCategory = 'brand' | 'events' | 'web';
type PortfolioFilter = 'all' | PortfolioCategory;
type PortfolioSectionType = 'dual' | 'featureGrid' | 'banner' | 'dualWithBanner';
type PortfolioTileType = 'image' | 'text';
type PortfolioFeatureGridTileSpan = 'single' | 'double';

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
  secondaryDescription?: string;
}

interface PortfolioFeatureGridTile extends PortfolioTile {
  span?: PortfolioFeatureGridTileSpan;
}

interface PortfolioFeatureGridSingleBlock {
  type: 'single';
  tile: PortfolioTile;
}

interface PortfolioFeatureGridGridBlock {
  type: 'grid';
  tiles: PortfolioFeatureGridTile[];
}

type PortfolioFeatureGridBlock =
  | PortfolioFeatureGridSingleBlock
  | PortfolioFeatureGridGridBlock;

interface PortfolioBaseSection {
  id: string;
  categories: PortfolioCategory[];
}

interface PortfolioFeatureGridSection extends PortfolioBaseSection {
  type: 'featureGrid';
  blocks: readonly [PortfolioFeatureGridBlock, PortfolioFeatureGridBlock];
}

interface PortfolioStandardSection extends PortfolioBaseSection {
  type: Exclude<PortfolioSectionType, 'featureGrid'>;
  tiles: PortfolioTile[];
}

type PortfolioSection = PortfolioStandardSection | PortfolioFeatureGridSection;

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
    blocks: [
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/renatus/renatus_1.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
      {
        type: 'grid',
        tiles: [
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
            title: "RENATUS",
            description: 'Unikalių interjero objektų paieškos internetinės svetainėsdizainas.',
            secondaryDescription: 'Projektas sukurtas studijų tikslams.',
            span: 'double',
          }
        ],
      },
    ],
  },
  {
    id: 'dizaino',
    type: 'featureGrid',
    categories: ['events'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/dizaino/dizaino_1.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "DIZAINO SAVAITE '26",
            description: 'Renginio vizualine komunikacija, socialiniu tinklu vizualai ir reklama.',
          },
          {
            type: 'text',
            title: "",
            description: '',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/dizaino/dizaino_2.png',
            alt: 'Mobilus svetaines ekranas su kortelemis',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/dizaino/dizaino_3.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
    ],
  },
  {
    id: 'gateris',
    type: 'featureGrid',
    categories: ['brand'],
    blocks: [
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/gateris/gateris_1.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/gateris/gateris_2.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "Mobilaus gaterio paslaugos",
            description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai.',
          }
        ],
      },
    ],
  },
  {
    id: 'sushi',
    type: 'featureGrid',
    categories: ['brand'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/sushi/sushi_1.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/sushi/sushi_2.png',
            alt: 'Mobilus svetaines ekranas su kortelemis',
          },
          {
            type: 'text',
            title: "URBAN SUSHI | GASTROBARAS",
            description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai, reklama.',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/sushi/sushi_3.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
    ],
  },
  {
    id: 'shirts',
    type: 'dual',
    categories: ['brand'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/portfolio/shirts/shirt_1.png',
        alt: 'Svetaines dizaino pristatymo plakatas',
      },
      {
        type: 'image',
        image: 'public/photos/portfolio/shirts/shirt_2.png',
        alt: 'Svetaines maketas kompiuterio ekrane',
      },
    ],
  },
  {
    id: 'garazas',
    type: 'featureGrid',
    categories: ['web'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/garazas/garazas_1.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "GARAŽAS | 9:11",
            description: 'Automobilių muziejaus interneto svetainės dizaino atnaujinimas.',
            secondaryDescription: 'Projektas sukurtas studijų tikslams.',
          },
          {
            type: 'text',
            title: "",
            description: '',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/garazas/garazas_2.png',
            alt: 'Mobilus svetaines ekranas su kortelemis',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/garazas/garazas_3.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
    ],
  },
  {
    id: 'vaisiai',
    type: 'featureGrid',
    categories: ['brand'],
    blocks: [
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/vaisiai/vaisiai_1.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/vaisiai/vaisiai_2.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "VAISIŲ AMŽIUS",
            description: 'Firminio stiliaus kūrimas, logotipas, pakuotės dizainas.',
            secondaryDescription: 'Projektas sukurtas studijų tikslams.',
          }
        ],
      },
    ],
  },
  {
    id: 'dublis',
    type: 'featureGrid',
    categories: ['web'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/dublis/dublis_1.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/dublis/dublis_2.png',
            alt: 'Mobilus svetaines ekranas su kortelemis',
          },
          {
            type: 'text',
            title: "DUBLIS | GASTROBARAS",
            description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai, reklama.',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/dublis/dublis_3.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
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
    id: 'paws',
    type: 'featureGrid',
    categories: ['events'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/paws/paws_1.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "HOPE FOR PAWS",
            description: 'Renginio vizualinės komunikacijos rengimas, firminis stilius, logotipas.',
            secondaryDescription: 'Projektas sukurtas studijų tikslams.',
          },
          {
            type: 'text',
            title: "",
            description: '',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/paws/paws_2.png',
            alt: 'Mobilus svetaines ekranas su kortelemis',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/paws/paws_3.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
    ],
  },
  {
    id: 'health',
    type: 'dual',
    categories: ['web'],
    tiles: [
      {
        type: 'image',
        image: 'public/photos/portfolio/health/health_1.png',
        alt: 'Svetaines dizaino pristatymo plakatas',
      },
      {
        type: 'image',
        image: 'public/photos/portfolio/health/health_2.png',
        alt: 'Svetaines maketas kompiuterio ekrane',
      },
    ],
  },
  {
    id: 'aidai',
    type: 'featureGrid',
    categories: ['events'],
    blocks: [
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/aidai/aidai_1.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/aidai/aidai_2.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "ŽVAIGŽDŽIŲ AIDAI",
            description: 'Renginio vizualinės komunikacijos rengimas, firminis stilius, logotipas.',
            secondaryDescription: 'Projektas sukurtas studijų tikslams.',
          }
        ],
      },
    ],
  },
  {
    id: 'laisvalaikio',
    type: 'featureGrid',
    categories: ['web'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'text',
            title: "LAISVALAIKIO SVETAINĖ",
            description: 'Internetinės svetainės diziano kūrimas pagal temą.',
            secondaryDescription: 'Projektas sukurtas studijų tikslams.',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/laisvalaikis/laisvalaikis_1.png',
            alt: 'Mobilus svetaines ekranas',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/laisvalaikis/laisvalaikis_2.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
    ],
  },
  {
    id: 'elegance',
    type: 'featureGrid',
    categories: ['brand'],
    blocks: [
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/elegance/elegance_1.png',
          alt: 'Renatus interjero objektu paieskos projekto vizualas',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/elegance/elegance_2.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/elegance/elegance_3.png',
            alt: 'Mobilus svetaines ekranas',
          },
          {
            type: 'text',
            title: "SKIN ELEGANCE",
            description: 'Firminio stiliaus kūrimas, logotipas ir socialinių tinklų vizualai.',
          }
        ],
      },
    ],
  }
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

  getSectionTiles(section: PortfolioSection): PortfolioTile[] {
    return 'tiles' in section ? section.tiles : [];
  }

  getFeatureGridBlocks(section: PortfolioSection): readonly PortfolioFeatureGridBlock[] {
    return section.type === 'featureGrid' ? section.blocks : [];
  }
}
