import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginDialogComponent } from './header/login-dialog/login-dialog.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})
export class CoreModule { }
