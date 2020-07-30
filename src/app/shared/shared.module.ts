import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgentFormComponent } from './agent-form/agent-form.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ImgPreviewComponent } from './agent-form/img-preview/img-preview.component';

@NgModule({
  declarations: [
    AgentFormComponent,
    ImgPreviewComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AgentFormComponent,
    ImgPreviewComponent
  ]
})
export class SharedModule { }
