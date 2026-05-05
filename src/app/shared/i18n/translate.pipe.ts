import {Pipe, PipeTransform, inject} from '@angular/core';
import {LocalizationService} from './localization.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private readonly localization = inject(LocalizationService);

  transform(key: string): string {
    return this.localization.translate(key);
  }
}
