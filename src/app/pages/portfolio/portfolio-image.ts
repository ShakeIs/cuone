export interface ResponsiveImageAsset {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

const PORTFOLIO_IMAGE_VERSION = 'v1';
const PORTFOLIO_IMAGE_ROOT = `public/photos/portfolio-responsive/${PORTFOLIO_IMAGE_VERSION}`;

const SQUARE_IMAGE_TARGET_WIDTHS = [360, 640, 830] as const;
const DESKTOP_BANNER_TARGET_WIDTHS = [960, 1680] as const;
const MOBILE_BANNER_TARGET_WIDTHS = [321] as const;

export const PORTFOLIO_IMAGE_SIZES = {
  square: '(max-width: 768px) calc(100vw - 24px), (max-width: 1024px) 360px, 830px',
  grid: '(max-width: 768px) calc((100vw - 36px) / 2), (max-width: 1024px) 172px, 405px',
  span: '(max-width: 768px) calc(100vw - 24px), (max-width: 1024px) 360px, 830px',
  banner: '(max-width: 768px) 321px, (max-width: 1024px) calc(100vw - 48px), 1680px',
  bannerMobile: '321px',
} as const;

function getAvailableWidths(sourceWidth: number, targetWidths: readonly number[]): number[] {
  const widths = targetWidths.filter(width => width < sourceWidth);
  const largestWidth = Math.min(sourceWidth, targetWidths[targetWidths.length - 1]);

  if (!widths.includes(largestWidth)) {
    widths.push(largestWidth);
  }

  return widths;
}

function createResponsiveImage(
  relativePath: string,
  sourceWidth: number,
  sourceHeight: number,
  targetWidths: readonly number[],
  sizes: string
): ResponsiveImageAsset {
  const widths = getAvailableWidths(sourceWidth, targetWidths);
  const srcSet = widths
    .map(width => `${PORTFOLIO_IMAGE_ROOT}/${relativePath}-${width}.png ${width}w`)
    .join(', ');
  const largestWidth = widths[widths.length - 1];

  return {
    src: `${PORTFOLIO_IMAGE_ROOT}/${relativePath}-${largestWidth}.png`,
    srcSet,
    sizes,
    width: sourceWidth,
    height: sourceHeight,
  };
}

export function createSquarePortfolioImage(
  relativePath: string,
  sourceWidth: number,
  sourceHeight: number,
  sizes: string = PORTFOLIO_IMAGE_SIZES.square
): ResponsiveImageAsset {
  return createResponsiveImage(
    relativePath,
    sourceWidth,
    sourceHeight,
    SQUARE_IMAGE_TARGET_WIDTHS,
    sizes
  );
}

export function createDesktopBannerImage(
  relativePath: string,
  sourceWidth: number,
  sourceHeight: number
): ResponsiveImageAsset {
  return createResponsiveImage(
    relativePath,
    sourceWidth,
    sourceHeight,
    DESKTOP_BANNER_TARGET_WIDTHS,
    PORTFOLIO_IMAGE_SIZES.banner
  );
}

export function createMobileBannerImage(
  relativePath: string,
  sourceWidth: number,
  sourceHeight: number
): ResponsiveImageAsset {
  return createResponsiveImage(
    relativePath,
    sourceWidth,
    sourceHeight,
    MOBILE_BANNER_TARGET_WIDTHS,
    PORTFOLIO_IMAGE_SIZES.bannerMobile
  );
}
