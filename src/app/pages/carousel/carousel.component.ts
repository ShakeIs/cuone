import {
  Component,
  QueryList,
  ViewChildren,
  ElementRef,
  AfterViewInit, signal, HostListener
} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

interface CarouselItem {
  video: string;
  title: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  imports: [
    NgClass,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  items: CarouselItem[] = [
    {
      video: 'public/videos/Mobilausgateriopaslaugos-video.mp4',
      title: 'BRAND IDENTITY',
    },
    {
      video: 'public/videos/Skinelegance-video.mp4',
      title: 'BRAND IDENTITY',
    },
    {
      video: 'public/videos/Zvaigdziuaidai-video.mp4',
      title: 'VISUALIZATION OF EVENT ADVERTISING CAMPAIGN',
    },
    {
      video: 'public/videos/Vaisiuamzius-video.mp4',
      title: 'BRAND IDENTITY',
    },
    {
      video: 'public/videos/Kupiskiomuziejus-video.mp4',
      title: 'BRAND IDENTITY',
    },
    {
      video: 'public/videos/Poster-video.mp4',
      title: 'POSTERS',
    }
  ];

  currentIndex = 0;

  screenWidth = signal(window.innerWidth);

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

  getPosition(index: number): 'left' | 'center' | 'right' | 'hidden' {
    if (this.screenWidth() <= 768) {
      if (index === this.currentIndex) return 'center';
      return 'hidden';
    }
    if (index === this.currentIndex) return 'center';
    if (index === (this.currentIndex > 0 && this.currentIndex - 1)) return 'left';
    if (index === (this.currentIndex + 1)) return 'right';
    return 'hidden';
  }

  private playCenterVideo() {
    if (!this.videos) return;

    this.videos.forEach((videoRef, index) => {
      const video = videoRef.nativeElement;

      if (index === this.currentIndex) {
        video.currentTime = 0;
        video.loop = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }
}
