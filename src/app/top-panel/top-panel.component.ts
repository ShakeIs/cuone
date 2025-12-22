import {Component, HostListener, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-top-panel',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.css',
})
export class TopPanel {

  screenWidth = signal(window.innerWidth);
  isMenuOpen = signal(false);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }
}
