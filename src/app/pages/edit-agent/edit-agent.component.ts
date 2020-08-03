import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html'
})
export class EditAgentComponent implements OnInit {
  id: number;
  message: string;
  isLoading = false;
  formData = null;

  constructor(
    private route: ActivatedRoute,
    private agentsService: AgentsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    // get id from the params url
    this.id = +this.route.snapshot.params.id;

    this.agentsService.getOne(this.id).then(response => {
      // on success response
      this.formData = response;
    }).catch((err: HttpErrorResponse) => {
      // on error response
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
