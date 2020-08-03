import { Component } from '@angular/core';

export interface ILink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links: ILink[] = [
    {
      name: 'סוכן חדש',
      url: '/agents/new'
    },
    {
      name: 'סוכנים',
      url: '/agents'
    }
  ];
}
