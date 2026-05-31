import {Component, computed, inject, signal} from '@angular/core';
import {Language, LocalizationService} from '../../shared/i18n/localization.service';
import {
  createDesktopBannerImage,
  createMobileBannerImage,
  createSquarePortfolioImage,
  PORTFOLIO_IMAGE_SIZES,
  ResponsiveImageAsset,
} from './portfolio-image';

type PortfolioCategory = 'brand' | 'events' | 'web';
type PortfolioFilter = 'all' | PortfolioCategory;
type PortfolioSectionType = 'dual' | 'featureGrid' | 'banner' | 'dualWithBanner';
type PortfolioTileType = 'image' | 'text';
type PortfolioFeatureGridTileSpan = 'single' | 'double';
type PortfolioImageLoading = 'eager' | 'lazy';
type PortfolioImageDecoding = 'sync' | 'async';
type PortfolioFetchPriority = 'high' | 'auto';

interface PortfolioFilterOption {
  value: PortfolioFilter;
  label: string;
}

interface PortfolioTile {
  type: PortfolioTileType;
  image?: ResponsiveImageAsset;
  mobileImage?: ResponsiveImageAsset;
  alt?: string;
  copyKey?: string;
  mobileSpan?: PortfolioFeatureGridTileSpan;
  span?: PortfolioFeatureGridTileSpan;
}

interface PortfolioFeatureGridTile extends PortfolioTile {
  mobileSpan?: PortfolioFeatureGridTileSpan;
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

interface PortfolioTileCopy {
  title?: string;
  description?: string;
  secondaryDescription?: string;
}

interface PortfolioCopy {
  subtitle: string;
  filters: Record<PortfolioFilter, string>;
  tiles: Record<string, PortfolioTileCopy>;
}

const PORTFOLIO_COPY: Record<Language, PortfolioCopy> = {
  lt: {
    subtitle: 'Naujausių klientų, akademinių ir asmeninių dizaino projektų.',
    filters: {
      all: 'Visi',
      brand: 'Firminis stilius',
      events: 'Renginiai',
      web: 'Web dizainas',
    },
    tiles: {
      renatus: {
        title: 'RENATUS',
        description: 'Unikalių interjero objektų paieškos internetinės svetainės dizainas.',
        secondaryDescription: 'Projektas sukurtas studijų tikslams.',
      },
      dizaino: {
        title: "DIZAINO SAVAITĖ '26",
        description: 'Renginio vizualinė komunikacija, socialinių tinklų vizualai ir reklama.',
      },
      gateris: {
        title: 'MOBILAUS GATERIO PASLAUGOS',
        description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai.',
      },
      sushi: {
        title: 'URBAN SUSHI | GASTROBARAS',
        description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai, reklama.',
      },
      garazas: {
        title: 'GARAŽAS | 9:11',
        description: 'Automobilių muziejaus interneto svetainės dizaino atnaujinimas.',
        secondaryDescription: 'Projektas sukurtas studijų tikslams.',
      },
      vaisiai: {
        title: 'VAISIŲ AMŽIUS',
        description: 'Firminio stiliaus kūrimas, logotipas, pakuotės dizainas.',
        secondaryDescription: 'Projektas sukurtas studijų tikslams.',
      },
      dublis: {
        title: 'DUBLIS | GASTROBARAS',
        description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai, reklama.',
      },
      paws: {
        title: 'HOPE FOR PAWS',
        description: 'Renginio vizualinės komunikacijos rengimas, firminis stilius, logotipas.',
        secondaryDescription: 'Projektas sukurtas studijų tikslams.',
      },
      aidai: {
        title: 'ŽVAIGŽDŽIŲ AIDAI',
        description: 'Renginio vizualinės komunikacijos rengimas, firminis stilius, logotipas.',
        secondaryDescription: 'Projektas sukurtas studijų tikslams.',
      },
      laisvalaikio: {
        title: 'LAISVALAIKIO SVETAINĖ',
        description: 'Internetinės svetainės dizaino kūrimas pagal temą.',
        secondaryDescription: 'Projektas sukurtas studijų tikslams.',
      },
      elegance: {
        title: 'SKIN ELEGANCE',
        description: 'Firminio stiliaus kūrimas, logotipas ir socialinių tinklų vizualai.',
      },
    },
  },
  en: {
    subtitle: 'Latest client, academic, and personal design projects.',
    filters: {
      all: 'All',
      brand: 'Brand Identity',
      events: 'Events',
      web: 'Web Design',
    },
    tiles: {
      renatus: {
        title: 'RENATUS',
        description: 'Design for a website dedicated to finding unique interior objects.',
        secondaryDescription: 'The project was created for study purposes.',
      },
      dizaino: {
        title: "DESIGN WEEK '26",
        description: 'Visual communication for the event, social media visuals, and advertising.',
      },
      gateris: {
        title: 'MOBILE SAWMILL SERVICES',
        description: 'Brand identity, logo, and social media visuals.',
      },
      sushi: {
        title: 'URBAN SUSHI | GASTROBAR',
        description: 'Brand identity, logo, social media visuals, and advertising.',
      },
      garazas: {
        title: 'GARAGE | 9:11',
        description: 'Website design refresh for an automotive museum.',
        secondaryDescription: 'The project was created for study purposes.',
      },
      vaisiai: {
        title: 'AGE OF FRUIT',
        description: 'Brand identity design, logo, and packaging design.',
        secondaryDescription: 'The project was created for study purposes.',
      },
      dublis: {
        title: 'DUBLIS | GASTROBAR',
        description: 'Brand identity, logo, social media visuals, and advertising.',
      },
      paws: {
        title: 'HOPE FOR PAWS',
        description: 'Event visual communication design, brand identity, and logo.',
        secondaryDescription: 'The project was created for study purposes.',
      },
      aidai: {
        title: 'ECHOES OF THE STARS',
        description: 'Event visual communication design, brand identity, and logo.',
        secondaryDescription: 'The project was created for study purposes.',
      },
      laisvalaikio: {
        title: 'LEISURE WEBSITE',
        description: 'Website design created based on a given theme.',
        secondaryDescription: 'The project was created for study purposes.',
      },
      elegance: {
        title: 'SKIN ELEGANCE',
        description: 'Brand identity design, logo, and social media visuals.',
      },
    },
  },
};

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
          image: createSquarePortfolioImage('renatus/renatus_1', 830, 830),
          alt: 'Renatus mobile website screens beside a phone and side table',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'renatus/renatus_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Renatus website mockup on a laptop screen',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'renatus/renatus_3',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Renatus furniture catalog mobile screens on a dark background',
          },
          {
            type: 'text',
            copyKey: 'renatus',
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
            image: createSquarePortfolioImage(
              'dizaino/dizaino_1',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Design Week 26 logo on a pink bubble background',
          },
          {
            type: 'text',
            copyKey: 'dizaino',
          },
          {
            type: 'text',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'dizaino/dizaino_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Glossy pink event typography on a white background',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: createSquarePortfolioImage('dizaino/dizaino_3', 830, 830),
          alt: 'Design Week 26 poster competition poster',
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
          image: createSquarePortfolioImage('gateris/gateris_1', 830, 830),
          alt: 'Mobile Sawmill Services Facebook cover mockup on a laptop screen',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'gateris/gateris_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Mobile Sawmill Services logo variations on orange and dark backgrounds',
          },
          {
            type: 'text',
            copyKey: 'gateris',
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
            image: createSquarePortfolioImage(
              'sushi/sushi_1',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Urban Sushi logo visual with sushi in the background',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'sushi/sushi_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Urban Sushi branded chopsticks on a red background',
          },
          {
            type: 'text',
            copyKey: 'sushi',
            mobileSpan: 'double',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: createSquarePortfolioImage('sushi/sushi_3', 830, 830),
          alt: 'Urban Sushi business cards beside a coffee cup',
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
        image: createSquarePortfolioImage('shirts/shirt_1', 830, 830),
        alt: 'Black T-shirt with a bold Stay Hungry graphic',
      },
      {
        type: 'image',
        image: createSquarePortfolioImage('shirts/shirt_2', 830, 830),
        alt: 'White T-shirt with a hand illustration and text graphic',
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
            image: createSquarePortfolioImage(
              'garazas/garazas_1',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Garage 9:11 mobile website screens with a sports car visual',
          },
          {
            type: 'text',
            copyKey: 'garazas',
          },
          {
            type: 'text',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'garazas/garazas_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Garage 9:11 website mockup on a desktop screen',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: createSquarePortfolioImage('garazas/garazas_3', 830, 830),
          alt: 'Garage 9:11 homepage on a laptop screen',
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
          image: createSquarePortfolioImage('vaisiai/vaisiai_1', 1080, 1080),
          alt: 'Age of Fruit freeze-dried strawberry package beside cheese and berries',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'vaisiai/vaisiai_2',
              1080,
              1080,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Age of Fruit roll-up stands with strawberry packaging',
          },
          {
            type: 'text',
            copyKey: 'vaisiai',
          }
        ],
      },
    ],
  },
  {
    id: 'dublis',
    type: 'featureGrid',
    categories: ['brand'],
    blocks: [
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'dublis/dublis_1',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Dublis gastrobar website mockup on a laptop screen',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'dublis/dublis_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Dublis gastrobar social media post on a phone screen',
          },
          {
            type: 'text',
            copyKey: 'dublis',
            mobileSpan: 'double',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: createSquarePortfolioImage('dublis/dublis_3', 830, 830),
          alt: 'Dublis gastrobar menu mockup with a business card',
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
        image: createDesktopBannerImage('banner/Phones-horizontal', 2027, 994),
        mobileImage: createMobileBannerImage('banner/mobiles_horizontal', 321, 434),
        alt: 'Social media ad mockups on phone screens with different project visuals',
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
            image: createSquarePortfolioImage(
              'paws/paws_1',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Hope for Paws social media post on a phone screen',
          },
          {
            type: 'text',
            copyKey: 'paws',
          },
          {
            type: 'text',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'paws/paws_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Hope for Paws packaging design on a white bag',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: createSquarePortfolioImage('paws/paws_3', 830, 830),
          alt: 'Hope for Paws poster with a dog portrait on a blue background',
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
        image: createSquarePortfolioImage('health/health_1', 830, 830),
        alt: 'App design mockup on two phone screens with a purple background',
      },
      {
        type: 'image',
        image: createSquarePortfolioImage('health/health_2', 830, 830),
        alt: 'App review and task screens on two phones',
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
          image: createSquarePortfolioImage('aidai/aidai_1', 830, 830),
          alt: 'Echoes of the Stars event poster with planets and a violet path',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'aidai/aidai_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Echoes of the Stars social post mockup on a phone screen',
          },
          {
            type: 'text',
            copyKey: 'aidai',
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
            copyKey: 'laisvalaikio',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'laisvalaikis/laisvalaikis_1',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Leisure website mockup with water activity cards',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: createSquarePortfolioImage('laisvalaikis/laisvalaikis_2', 830, 830),
          alt: 'Leisure website homepage on a laptop screen',
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
          image: createSquarePortfolioImage('elegance/elegance_1', 830, 830),
          alt: 'Skin Elegance brand identity assets on a light background',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'elegance/elegance_2',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Skin Elegance canvas bag with logo',
          },
          {
            type: 'image',
            image: createSquarePortfolioImage(
              'elegance/elegance_3',
              406,
              406,
              PORTFOLIO_IMAGE_SIZES.grid
            ),
            alt: 'Skin Elegance business card on a stone background',
          },
          {
            type: 'text',
            copyKey: 'elegance',
            mobileSpan: 'double',
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
  private readonly localization = inject(LocalizationService);

  readonly sections = PORTFOLIO_SECTIONS;
  readonly copy = computed(() => PORTFOLIO_COPY[this.localization.language()]);
  readonly filters = computed<ReadonlyArray<PortfolioFilterOption>>(() => {
    const labels = this.copy().filters;

    return [
      {value: 'all', label: labels.all},
      {value: 'brand', label: labels.brand},
      {value: 'events', label: labels.events},
      {value: 'web', label: labels.web},
    ];
  });
  readonly activeFilter = signal<PortfolioFilter>('all');
  readonly visibleSections = computed(() => {
    const filter = this.activeFilter();

    if (filter === 'all') {
      return this.sections;
    }

    return this.sections.filter((section) => section.categories.includes(filter));
  });
  readonly priorityImageIds = computed(() =>
    this.collectSectionImages(this.visibleSections())
      .slice(0, 2)
      .map(({sectionId, image}) => this.getImageId(sectionId, image))
  );

  setFilter(filter: PortfolioFilter) {
    this.activeFilter.set(filter);
  }

  getSectionTiles(section: PortfolioSection): PortfolioTile[] {
    return 'tiles' in section ? section.tiles : [];
  }

  getFeatureGridBlocks(section: PortfolioSection): readonly PortfolioFeatureGridBlock[] {
    return section.type === 'featureGrid' ? section.blocks : [];
  }

  isPlaceholderTile(tile: PortfolioTile): boolean {
    const copy = this.getTileCopy(tile);

    return tile.type === 'text'
      && !copy.title?.trim()
      && !copy.description?.trim()
      && !copy.secondaryDescription?.trim();
  }

  getPortfolioSubtitle(): string {
    return this.copy().subtitle;
  }

  getTileTitle(tile: PortfolioTile): string {
    return this.getTileCopy(tile).title ?? '';
  }

  getTileDescription(tile: PortfolioTile): string {
    return this.getTileCopy(tile).description ?? '';
  }

  getTileSecondaryDescription(tile: PortfolioTile): string {
    return this.getTileCopy(tile).secondaryDescription ?? '';
  }

  getImageLoading(sectionId: string, image: ResponsiveImageAsset): PortfolioImageLoading {
    return this.isPriorityImage(sectionId, image) ? 'eager' : 'lazy';
  }

  getImageDecoding(sectionId: string, image: ResponsiveImageAsset): PortfolioImageDecoding {
    return this.isPriorityImage(sectionId, image) ? 'sync' : 'async';
  }

  getImageFetchPriority(sectionId: string, image: ResponsiveImageAsset): PortfolioFetchPriority {
    return this.priorityImageIds()[0] === this.getImageId(sectionId, image) ? 'high' : 'auto';
  }

  private getTileCopy(tile: PortfolioTile): PortfolioTileCopy {
    if (!tile.copyKey) {
      return {};
    }

    return this.copy().tiles[tile.copyKey] ?? {};
  }

  private isPriorityImage(sectionId: string, image: ResponsiveImageAsset): boolean {
    return this.priorityImageIds().includes(this.getImageId(sectionId, image));
  }

  private getImageId(sectionId: string, image: ResponsiveImageAsset): string {
    return `${sectionId}:${image.src}`;
  }

  private collectSectionImages(
    sections: ReadonlyArray<PortfolioSection>
  ): Array<{sectionId: string; image: ResponsiveImageAsset}> {
    const images: Array<{sectionId: string; image: ResponsiveImageAsset}> = [];

    for (const section of sections) {
      if ('tiles' in section) {
        for (const tile of section.tiles) {
          if (tile.type === 'image' && tile.image) {
            images.push({sectionId: section.id, image: tile.image});
          }
        }

        continue;
      }

      for (const block of section.blocks) {
        if (block.type === 'single') {
          if (block.tile.type === 'image' && block.tile.image) {
            images.push({sectionId: section.id, image: block.tile.image});
          }

          continue;
        }

        for (const tile of block.tiles) {
          if (tile.type === 'image' && tile.image) {
            images.push({sectionId: section.id, image: tile.image});
          }
        }
      }
    }

    return images;
  }
}
