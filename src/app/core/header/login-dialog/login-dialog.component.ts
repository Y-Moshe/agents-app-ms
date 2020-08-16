import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  handleSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.dialogRef.close({
      ...form.value
    });
  }
}
