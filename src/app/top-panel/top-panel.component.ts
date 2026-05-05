import {Component, HostListener, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Language, LocalizationService} from '../shared/i18n/localization.service';
import {TranslatePipe} from '../shared/i18n/translate.pipe';

@Component({
  selector: 'app-top-panel',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.css',
})
export class TopPanel {
  protected readonly localization: LocalizationService;
  isHovered = false;
  screenWidth = signal(window.innerWidth);
  isMenuOpen = signal(false);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  constructor(private router: Router, localization: LocalizationService) {
    this.localization = localization;
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  navigate(link: string) {
    this.toggleMenu();
    this.router.navigate([link]);
  }

  async toggleLanguage() {
    const nextLanguage: Language = this.localization.language() === 'lt' ? 'en' : 'lt';
    await this.localization.setLanguage(nextLanguage);
  }

  get languageButtonLabel(): string {
    return this.localization.language() === 'lt' ? 'EN' : 'LT';
  }
}
