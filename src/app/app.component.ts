import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopPanel } from './top-panel/top-panel.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopPanel, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('frontend');
}
