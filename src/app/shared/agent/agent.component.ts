import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})
export class AgentComponent {
  @Output() delete: EventEmitter<{id: number, name: string}> = new EventEmitter<{id: number, name: string}>();

  @Input() id: number;
  @Input() name: string;
  @Input() imgURL: string;
}
