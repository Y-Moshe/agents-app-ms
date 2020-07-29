import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsComponent } from './pages/agents/agents.component';
import { NewAgentComponent } from './pages/new-agent/new-agent.component';
import { EditAgentComponent } from './pages/edit-agent/edit-agent.component';

const routes: Routes = [
  {
    path: 'agents',
    pathMatch: 'full',
    component: AgentsComponent
  },
  {
    path: 'agents/new',
    component: NewAgentComponent
  },
  {
    path: 'agents/edit/:id',
    component: EditAgentComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'agents'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
