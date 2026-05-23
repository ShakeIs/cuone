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
  mobileImage?: string;
  alt?: string;
  title?: string;
  description?: string;
  secondaryDescription?: string;
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
          alt: 'Renatus interjero svetainės mobilūs ekranai prie telefono ir staliuko',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/renatus/renatus_2.png',
            alt: 'Renatus interjero svetainės maketas nešiojamojo kompiuterio ekrane',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/renatus/renatus_3.png',
            alt: 'Renatus baldų katalogo mobilūs ekranai tamsiame fone',
          },
          {
            type: 'text',
            title: "RENATUS",
            description: 'Unikalių interjero objektų paieškos internetinės svetainės dizainas.',
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
            alt: 'Dizaino savaitė 26 logotipas rožiniame burbulo fone',
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
            alt: 'Blizgus rožinis renginio tipografinis vizualas baltame fone',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/dizaino/dizaino_3.png',
          alt: 'Dizaino savaitė 26 plakato konkurso plakatas',
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
          alt: 'Mobilaus Gaterio Paslaugos Facebook viršelio maketas nešiojamojo kompiuterio ekrane',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/gateris/gateris_2.png',
            alt: 'Mobilaus Gaterio Paslaugos logotipo variantai oranžiniame ir tamsiame fone',
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
            alt: 'Urban Sushi logotipo vizualas su sušių fonu',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/sushi/sushi_2.png',
            alt: 'Urban Sushi firminės lazdelės juodame dėkle ant raudono fono',
          },
          {
            type: 'text',
            title: "URBAN SUSHI | GASTROBARAS",
            mobileSpan: 'double',
            description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai, reklama.',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/sushi/sushi_3.png',
          alt: 'Urban Sushi vizitinės kortelės prie kavos puodelio',
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
        alt: 'Juodi marškinėliai su ryškiu STAY HUNGRY grafiniu piešiniu',
      },
      {
        type: 'image',
        image: 'public/photos/portfolio/shirts/shirt_2.png',
        alt: 'Balti marškinėliai su rankos iliustracija ir užrašu THIS TASKA',
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
            alt: 'Garažas 9:11 svetainės mobilūs ekranai su sportinio automobilio vizualu',
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
            alt: 'Garažas 9:11 svetainės maketas kompiuterio ekrane',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/garazas/garazas_3.png',
          alt: 'Garažas 9:11 svetainės pradžios puslapis nešiojamojo kompiuterio ekrane',
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
          alt: 'Vaisių amžius liofilizuotų braškių pakuotė šalia sūrio ir uogų',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/vaisiai/vaisiai_2.png',
            alt: 'Vaisių amžius reklaminiai roll-up stendai su braškių pakuote',
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
            alt: 'Gastrobaro Dublis svetainės maketas nešiojamojo kompiuterio ekrane',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/dublis/dublis_2.png',
            alt: 'Gastrobaro Dublis socialinių tinklų įrašas telefono ekrane',
          },
          {
            type: 'text',
            title: "DUBLIS | GASTROBARAS",
            mobileSpan: 'double',
            description: 'Firminis stilius, logotipas ir socialinių tinklų vizualai, reklama.',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/dublis/dublis_3.png',
          alt: 'Gastrobaro Dublis meniu maketas su vizitine kortele',
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
        mobileImage: 'public/photos/portfolio/mobiles_horizontal.png',
        alt: 'Socialinių tinklų reklamų maketai telefonų ekranuose su skirtingais projektų vizualais',
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
            alt: 'Hope for Paws socialinio tinklo įrašas telefono ekrane',
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
            alt: 'Hope for Paws pakuotės dizainas ant balto maišelio',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/paws/paws_3.png',
          alt: 'Hope for Paws plakatas su šunelio portretu mėlyname fone',
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
        alt: 'Programėlės dizaino maketas dviejuose telefonų ekranuose violetiniame fone',
      },
      {
        type: 'image',
        image: 'public/photos/portfolio/health/health_2.png',
        alt: 'Programėlės vertinimų ir užduočių ekranai dviejuose telefonuose',
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
          alt: 'Žvaigždžių Aidai renginio plakatas su planetomis ir violetiniu taku',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/aidai/aidai_2.png',
            alt: 'Žvaigždžių Aidai socialinio tinklo įrašo maketas telefono ekrane',
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
            alt: 'Laisvalaikio svetainės maketas su vandens pramogų kortelėmis',
          }
        ],
      },
      {
        type: 'single',
        tile: {
          type: 'image',
          image: 'public/photos/portfolio/laisvalaikis/laisvalaikis_2.png',
          alt: 'Laisvalaikio svetainės pradžios puslapis nešiojamojo kompiuterio ekrane',
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
          alt: 'Skin Elegance firminio stiliaus priemonės ant šviesaus fono',
        },
      },
      {
        type: 'grid',
        tiles: [
          {
            type: 'image',
            image: 'public/photos/portfolio/elegance/elegance_2.png',
            alt: 'Skin Elegance drobinis krepšys su logotipu',
          },
          {
            type: 'image',
            image: 'public/photos/portfolio/elegance/elegance_3.png',
            alt: 'Skin Elegance vizitinė kortelė ant akmenukų fono',
          },
          {
            type: 'text',
            title: "SKIN ELEGANCE",
            mobileSpan: 'double',
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

  isPlaceholderTile(tile: PortfolioTile): boolean {
    return tile.type === 'text'
      && !tile.title?.trim()
      && !tile.description?.trim()
      && !tile.secondaryDescription?.trim();
  }
}
