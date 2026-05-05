import {Component, HostListener, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-portfolio',
  imports: [
    RouterLink,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class Portfolio {
  screenWidth = signal(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }
}
