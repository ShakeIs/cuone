import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '../shared/i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  isHovered = false;

  constructor(private router: Router) {
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }
}
