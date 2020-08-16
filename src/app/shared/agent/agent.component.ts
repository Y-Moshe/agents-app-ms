import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})
export class AgentComponent {
  /**
   * Will fire whenever the delete button clicked.
   * With one object paramater of type:
   * {id: number, name: string}
   */
  @Output() delete = new EventEmitter<{id: number, name: string}>();

  /**
   * Agent ID, should be a uniqe number
   */
  @Input() id: number;
  /**
   * Agent name to display
   */
  @Input() name: string;
  /**
   * image source url to display
   */
  @Input() imgURL: string;
  /**
   * Agent locke state
   */
  @Input() locked: boolean;
  /**
   * disable/enable conditionally the buttons
   */
  @Input() isLoading = false;
}
