import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {
  id: number;
  message: string;
  isLoading = false;
  formData = null;

  constructor(
    private route: ActivatedRoute,
    private agentsService: AgentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = +this.route.snapshot.params.id;

    this.agentsService.getOne(this.id).then(response => {
      this.formData = response;

    }).catch((err: HttpErrorResponse) => {
      const msg = this.agentsService.getRightErrMessage(err);

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
      const msg = this.agentsService.getRightErrMessage(err);

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
