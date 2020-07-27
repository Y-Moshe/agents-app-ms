import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit {
  isLoading = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(form: any): void {
    this.isLoading = true;
  }

}
