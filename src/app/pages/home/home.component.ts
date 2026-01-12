import {Component, HostListener, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CarouselComponent} from '../carousel/carousel.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CarouselComponent,
    NgClass
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
    {normal: 'public/clients/gateris-hover.svg', hover: 'public/clients/gateris-hover.svg'},
    {normal: 'public/clients/kunset.svg', hover: 'public/clients/kunset-hover.svg'},
    {normal: 'public/clients/kupiskio.svg', hover: 'public/clients/kupiskio-hover.svg'},
    {normal: 'public/clients/vaisiu.svg', hover: 'public/clients/vaisiu-hover.svg'},
    {normal: 'public/clients/artele.svg', hover: 'public/clients/artele-hover.svg'},
    {normal: 'public/clients/dublis.svg', hover: 'public/clients/dublis-hover.svg'},
    {normal: 'public/clients/padel.svg', hover: 'public/clients/padel.svg'},
    {normal: 'public/clients/skin.svg', hover: 'public/clients/skin-hover.svg'},
    {normal: 'public/clients/lineka.svg', hover: 'public/clients/lineka-hover.svg'},
    {normal: 'public/clients/zelvos.svg', hover: 'public/clients/zelvos-hover.svg'},
  ];

  mobileImages = [
    {normal: 'public/clients/gateris.svg', hover: 'public/clients/gateris-hover.svg'},
    {normal: 'public/clients/kunset.svg', hover: 'public/clients/kunset-hover.svg'},
    {normal: 'public/clients/kupiskio.svg', hover: 'public/clients/kupiskio-hover.svg'},
    {normal: 'public/clients/vaisiu.svg', hover: 'public/clients/vaisiu-hover.svg'},
    {normal: 'public/clients/artele.svg', hover: 'public/clients/artele-hover.svg'},
    {normal: 'public/clients/zelvos.svg', hover: 'public/clients/zelvos-hover.svg'},
    {normal: 'public/clients/dublis.svg', hover: 'public/clients/dublis-hover.svg'},
    {normal: 'public/clients/skin.svg', hover: 'public/clients/skin-hover.svg'},
    {normal: 'public/clients/lineka.svg', hover: 'public/clients/lineka-hover.svg'},
  ];

}
