import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgentFormComponent } from './agent-form/agent-form.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ImgPreviewComponent } from './agent-form/img-preview/img-preview.component';
import { AgentComponent } from './agent/agent.component';
import { AppRoutingModule } from '../app-routing.module';
import { UrlErrorMsgComponent } from './agent-form/url-error-msg/url-error-msg.component';

@NgModule({
  declarations: [
    AgentFormComponent,
    ImgPreviewComponent,
    AgentComponent,
    UrlErrorMsgComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    AgentFormComponent,
    AgentComponent
  ]
})
export class SharedModule { }
