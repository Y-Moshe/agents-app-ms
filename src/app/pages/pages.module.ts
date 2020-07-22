import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsComponent } from './agents/agents.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AgentsComponent,
    EditAgentComponent,
    NewAgentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
