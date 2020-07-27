import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgentFormComponent } from './agent-form/agent-form.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    AgentFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AgentFormComponent
  ]
})
export class SharedModule { }
