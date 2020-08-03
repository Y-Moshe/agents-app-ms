import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { transition, animate, style, trigger, query, stagger } from '@angular/animations';

import { AgentsService, IAgents } from '../../services/agents.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  animations: [
    trigger('listAgents', [
      transition('* <=> *', [
        // display (agents) animations
        query(':enter', [
          style({
            opacity: 0.5,
            transform: 'scale(0.5)',
          }),
          stagger(100,
            animate(300, style({
                opacity: 1,
                transform: 'none'
            }))
          )
        ], { optional: true }),
        // delete animations
        query(':leave',
          animate(300, style({
            opacity: 0.5,
            transform: 'scale(0.3)'
          }))
        , { optional: true })
      ])
    ])
  ]
})
export class AgentsComponent implements OnInit {
  agents: IAgents[] = [];
  isLoading = false;
  isDeleting = false;

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
        this.isDeleting = true;

        this.agentsService.delete(data.id).then(message => {
          // on success response
          this.setAlert('success', message);

          const index = this.agents.findIndex(a => a.id === data.id);
          this.agents.splice(index, 1);
        }).catch((error: HttpErrorResponse) => {
          // on error response
          const msg = this.agentsService.getRightErrMessage(error);

          this.setAlert('danger', msg);
        }).finally(() => {
          this.isDeleting = false;
        });
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
