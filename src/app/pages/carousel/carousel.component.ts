import {
  Component,
  QueryList,
  ViewChildren,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

interface CarouselItem {
  video: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  imports: [
    NgClass,
    NgForOf
  ],
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  items: CarouselItem[] = [
    {
      video: 'videos/Kupiskiomuziejus-video.mp4',
      title: 'Mountain',
      description: 'Nature experience'
    },
    {
      video: 'videos/Poster-video.mp4',
      title: 'City',
      description: 'Urban life'
    },
    {
      video: 'videos/Vaisiuamzius-video.mp4',
      title: 'Ocean',
      description: 'Relaxing waves'
    }
  ];

  currentIndex = 0;

  ngAfterViewInit() {
    this.playCenterVideo();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.playCenterVideo();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.playCenterVideo();
  }

  getPosition(index: number): 'left' | 'center' | 'right' | 'hidden' {
    if (index === this.currentIndex) return 'center';
    if (index === (this.currentIndex - 1 + this.items.length) % this.items.length) return 'left';
    if (index === (this.currentIndex + 1) % this.items.length) return 'right';
    return 'hidden';
  }

  private playCenterVideo() {
    if (!this.videos) return;

    this.videos.forEach((videoRef, index) => {
      const video = videoRef.nativeElement;

      if (index === this.currentIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }
}
