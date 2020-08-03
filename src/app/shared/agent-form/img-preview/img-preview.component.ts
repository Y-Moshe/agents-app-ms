import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html'
})
export class ImgPreviewComponent {
  @Input() in: boolean;
  @Input() src: string;
  /**
   * The height of the image and it's container
   */
  @Input() height: number;
}
