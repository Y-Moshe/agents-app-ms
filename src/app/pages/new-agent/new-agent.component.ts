import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent {
  isLoading = false;

  constructor(
    private agentsService: AgentsService,
    private snackBar: MatSnackBar
  ) { }

  handleSubmit(form: any): void {
    this.isLoading = true;

    this.agentsService.add(form).then(message => {
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
