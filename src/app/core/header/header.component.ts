import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AuthService, IUser } from '../../services/auth.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: IUser;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // setting the current user stored in the service
    this.user = this.authService.getUser();
    // setting up a subscription to any change
    this.authSubscription = this.authService.getObservable().subscribe(user => {
      // on error
      if (user instanceof HttpErrorResponse) {
        const error = (user as HttpErrorResponse);
        this.user = null;
        this.snackBar.open(error.error.message || error.message, 'Close', {
          panelClass: ['bg-danger', 'text-white'],
          duration: 3000
        });
        return;
      }
      // on success
      this.user = user;
    }, () => {
      this.user = null;
    });
  }

  handleLogin(): void {
    // open login dialog
    this.dialog.open(LoginDialogComponent)
      .afterClosed().subscribe(credentials => {
      // if was submitted, send login request
      if (credentials) {
        this.authService.login(
          credentials.username,
          credentials.password
        );
      }
    });
  }

  handleLogout(): void {
    this.user = null;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
