import {Component, HostListener, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-portfolio',
  imports: [
    RouterLink
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
