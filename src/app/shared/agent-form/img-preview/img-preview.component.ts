import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html'
})
export class ImgPreviewComponent {
  @Input() in: boolean;
  @Input() src: string;
  @Input() width: number;
  @Input() height: number;
}
