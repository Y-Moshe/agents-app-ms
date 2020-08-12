import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-url-error-msg',
  templateUrl: './url-error-msg.component.html'
})
export class UrlErrorMsgComponent {
  @Input() in = false;
}
