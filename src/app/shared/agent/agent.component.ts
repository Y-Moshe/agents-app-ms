import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  @Input() id: number;
  @Input() name: string;
  @Input() imgURL: string;

  constructor() { }

  ngOnInit(): void {
  }

}
