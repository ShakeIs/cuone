import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CarouselComponent,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class Home {
  screenWidth = signal(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  hoveredIndex: number | null = null;

  images = [
    { normal: 'public/clients/gateris_1.svg' },
    { normal: 'public/clients/kunset_2.svg' },
    { normal: 'public/clients/kupiskio_3.svg' },
    { normal: 'public/clients/vaisiu_4.svg' },
    { normal: 'public/clients/artele_5.svg' },
    { normal: 'public/clients/dublis_6.svg' },
    { normal: 'public/clients/renatus_7.svg' },
    { normal: 'public/clients/dizaino_8.svg' },
    { normal: 'public/clients/lineka_9.svg' },
    { normal: 'public/clients/sushi_10.svg' },
  ];

  mobileImages = [
    { normal: 'public/clients/gateris_1.svg', width: 80 },
    { normal: 'public/clients/kunset_2.svg', width: 80 },
    { normal: 'public/clients/kupiskio_3.svg', width: 80 },
    { normal: 'public/clients/vaisiu_4.svg', width: 80 },
    { normal: 'public/clients/artele_5.svg', width: 80 },
    { normal: 'public/clients/dizaino_8.svg', width: 55 },
    { normal: 'public/clients/dublis_6.svg', width: 80 },
    { normal: 'public/clients/lineka_9.svg', width: 80 },
    { normal: 'public/clients/sushi_10.svg', width: 80 },
  ];

}
