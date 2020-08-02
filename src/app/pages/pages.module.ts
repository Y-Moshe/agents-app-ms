import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsComponent } from './agents/agents.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DeleteDialogComponent } from './agents/delete-dialog/delete-dialog.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    AgentsComponent,
    EditAgentComponent,
    NewAgentComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class PagesModule { }
