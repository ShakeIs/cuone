import {Component, HostListener, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-top-panel',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.css',
})
export class TopPanel {

  isHovered = false;
  screenWidth = signal(window.innerWidth);
  isMenuOpen = signal(false);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  constructor(private router: Router) {
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  navigate(link: string) {
    this.toggleMenu();
    this.router.navigate([link]);
  }
}
