import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { AgentsService, IAgents } from '../../services/agents.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html'
})
export class AgentsComponent implements OnInit {
  agents: IAgents[];
  isLoading = false;

  constructor(
    private agentsService: AgentsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.agentsService.getAll().then(response => {
      // on success response
      this.agents = response;
    }).catch((error: HttpErrorResponse) => {
      // on error response
      const msg = this.agentsService.getRightErrMessage(error);

      this.setAlert('danger', msg);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  handleDelete(data: {id: number, name: string}): void {
    // opening a delete dialog
    // answer is undefined or true
    this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      height: 'auto',
      data
    }).afterClosed().subscribe(answer => {
      if (answer) {
        console.log('deleted');
        // make delete http request
      }
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
