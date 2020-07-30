import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss']
})
export class ImgPreviewComponent {
  @Input() in: boolean;
  @Input() src: string;
  @Input() width: number;
  @Input() height: number;
}
