import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AgentsService } from 'src/app/services/agents.service';

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
    private agentsService: AgentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = +this.route.snapshot.params.id;

    this.agentsService.getOne(this.id).then(res => {
      console.log(res);
      this.formData = res;

    }).catch((err: HttpErrorResponse) => {
      let msg = err.message;
      if (err.error.error.message) {
        msg = err.error.error.message;
      }

      this.setAlert('danger', msg);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  handleSubmit(form: any): void {
    this.isLoading = true;
    this.message = null;

    this.agentsService.edit(this.id, form).then(message => {
      this.setAlert('success', message);

    }).catch((err: HttpErrorResponse) => {
      let msg = err.message;
      if (err.error.error?.message) {
        msg = err.error.error?.message;
      }

      this.setAlert('danger', msg);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  private setAlert(status: 'success' | 'danger', message: string): void {
    this.snackBar.open(message, 'Close', {
      panelClass: [
        'text-white',
        status === 'success' ? 'bg-success' : 'bg-danger'
      ],
      duration: 3000
    });
  }

}
