import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  year: string;

  constructor() { }

  ngOnInit(): void {
    const d = new Date();
    this.year = `${d.getFullYear()}.${d.getMonth()}`;
  }
}
