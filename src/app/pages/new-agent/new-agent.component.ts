import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html'
})
export class NewAgentComponent {
  isLoading = false;

  constructor(
    private agentsService: AgentsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  handleSubmit(form: any): void {
    this.isLoading = true;

    this.agentsService.add(form).then(message => {
      // on success response
      this.setAlert('success', message);
      this.router.navigate(['/']);
    }).catch((err: HttpErrorResponse) => {
      // on error response
      const msg = this.agentsService.getRightErrMessage(err);

      this.setAlert('danger', msg);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  /**
   * Displaying an alert message using MatSnackBar
   * @param status 'success' or 'danger'
   * @param message the message body
   */
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
