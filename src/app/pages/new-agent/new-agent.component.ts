import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit {
  isLoading = false;
  message: string;

  constructor(
    private agentsService: AgentsService
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(form: any): void {
    this.isLoading = true;
    this.message = null;

    console.log(form);

    this.agentsService.add(form).then(res => {
      this.message = res.message;
    }).catch((err: HttpErrorResponse) => {
      this.message = err.message;
    }).finally(() => {
      this.isLoading = false;
    });
  }

}
