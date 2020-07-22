import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentFormComponent } from './agent-form/agent-form.component';

@NgModule({
  declarations: [
    AgentFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgentFormComponent
  ]
})
export class SharedModule { }
