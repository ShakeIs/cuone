import {Component, HostListener, signal} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {TranslatePipe} from '../../shared/i18n/translate.pipe';

interface CarouselItem {
  image: string;
  titleKey: string;
}

type CarouselPosition = 'left' | 'center' | 'right' | 'hidden-left' | 'hidden-right';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  imports: [
    NgClass,
    NgForOf,
    TranslatePipe
  ],
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  items: CarouselItem[] = [
    {
      image: 'public/carousel/web-dizainas.png',
      titleKey: 'carousel.webDesign',
    },
    {
      image: 'public/carousel/renginiai.png',
      titleKey: 'carousel.eventsDesign',
    },
    {
      image: 'public/carousel/firminis-stilius.png',
      titleKey: 'carousel.brandStyle',
    },
    {
      image: 'public/carousel/pakuotes-dizainas.png',
      titleKey: 'carousel.packagingDesign',
    },
    {
      image: 'public/carousel/marskineliu-dizainas.png',
      titleKey: 'carousel.tshirtDesign',
    },
    {
      image: 'public/carousel/post.png',
      titleKey: 'carousel.digitalAndPrintDesign',
    }
  ];

  currentIndex = 0;

  screenWidth = signal(window.innerWidth);
  readonly mobileBreakpoint = 768;

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  next() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex = (this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex = (this.currentIndex - 1);
    }
  }

  get hasPrev(): boolean {
    return this.currentIndex > 0;
  }

  get hasNext(): boolean {
    return this.currentIndex < this.items.length - 1;
  }

  getPosition(index: number): CarouselPosition {
    if (this.screenWidth() <= this.mobileBreakpoint) {
      if (index === this.currentIndex) return 'center';
      return index < this.currentIndex ? 'hidden-left' : 'hidden-right';
    }

    if (index === this.currentIndex) return 'center';
    if (index === this.currentIndex - 1) return 'left';
    if (index === this.currentIndex + 1) return 'right';
    return index < this.currentIndex ? 'hidden-left' : 'hidden-right';
  }

  isCenter(index: number): boolean {
    return this.getPosition(index) === 'center';
  }
}
