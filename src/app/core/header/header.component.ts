import { Component, OnInit, Input } from '@angular/core';

import { ILink } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() links: ILink[];

  constructor() { }

  ngOnInit(): void {
  }

}
