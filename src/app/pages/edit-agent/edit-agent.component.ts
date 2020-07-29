import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgentsService } from 'src/app/services/agents.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {
  isLoading = false;
  id: number;
  formData = null;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private agentsService: AgentsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = +this.route.snapshot.params.id;

    this.agentsService.getOne(this.id).then(res => {
      this.formData = res;
    }).catch((err: HttpErrorResponse) => {
      this.message = err.message;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  handleSubmit(form: any): void {
    this.isLoading = true;
    this.message = null;

    this.agentsService.edit(this.id, form).then(res => {
      this.message = res.message;
    }).catch((err: HttpErrorResponse) => {
      this.message = err.message;
    }).finally(() => {
      this.isLoading = false;
    });
  }

}
