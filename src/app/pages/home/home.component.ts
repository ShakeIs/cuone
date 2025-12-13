import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class Home {
  // TODO: Custom height and width :)

  hoveredIndex: number | null = null;

  images = [
    {normal: 'clients/gateris.svg', hover: 'clients/gateris-hover.svg'},
    {normal: 'clients/kunset.svg', hover: 'clients/kunset-hover.svg'},
    {normal: 'clients/kupiskio.svg', hover: 'clients/kupiskio-hover.svg'},
    {normal: 'clients/vaisiu.svg', hover: 'clients/vaisiu-hover.svg'},
    {normal: 'clients/artele.svg', hover: 'clients/artele-hover.svg'},
    {normal: 'clients/dublis.svg', hover: 'clients/dublis-hover.svg'},
    {normal: 'clients/padel.svg', hover: 'clients/padel.svg'},
    {normal: 'clients/skin.svg', hover: 'clients/skin-hover.svg'},
    {normal: 'clients/lineka.svg', hover: 'clients/lineka-hover.svg'},
    {normal: 'clients/zelvos.svg', hover: 'clients/zelvos-hover.svg'},
  ];

}
