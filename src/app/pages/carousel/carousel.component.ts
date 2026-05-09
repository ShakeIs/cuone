import {AfterViewInit, Component, ElementRef, HostListener, QueryList, signal, ViewChildren} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {TranslatePipe} from '../../shared/i18n/translate.pipe';

interface CarouselItem {
  video: string;
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
export class CarouselComponent implements AfterViewInit {

  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  items: CarouselItem[] = [
    {
      video: 'public/videos/Mobilausgateriopaslaugos-video.mp4',
      titleKey: 'carousel.brandIdentity',
    },
    {
      video: 'public/videos/Skinelegance-video.mp4',
      titleKey: 'carousel.brandIdentity',
    },
    {
      video: 'public/videos/Zvaigdziuaidai-video.mp4',
      titleKey: 'carousel.eventVisualization',
    },
    {
      video: 'public/videos/Vaisiuamzius-video.mp4',
      titleKey: 'carousel.brandIdentity',
    },
    {
      video: 'public/videos/Kupiskiomuziejus-video.mp4',
      titleKey: 'carousel.brandIdentity',
    },
    {
      video: 'public/videos/Poster-video.mp4',
      titleKey: 'carousel.posters',
    }
  ];

  currentIndex = 0;

  screenWidth = signal(window.innerWidth);
  readonly mobileBreakpoint = 768;

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  ngAfterViewInit() {
    this.playCenterVideo();
  }

  next() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex = (this.currentIndex + 1);
    }
    this.playCenterVideo();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex = (this.currentIndex - 1);
    }
    this.playCenterVideo();
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

  private playCenterVideo() {
    if (!this.videos) return;

    this.videos.forEach((videoRef, index) => {
      const video = videoRef.nativeElement;

      if (index === this.currentIndex) {
        video.currentTime = 0;
        video.loop = true;
        video.play().catch(() => {
        });
      } else {
        video.pause();
      }
    });
  }
}
