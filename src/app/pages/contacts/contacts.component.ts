import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-contacts',
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class Contacts {

}
