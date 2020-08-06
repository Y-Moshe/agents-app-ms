import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html'
})
export class ImgPreviewComponent {
  /**
   * Hide/Show the image, uses *ngIf
   */
  @Input() in: boolean;
  /**
   * image source url
   */
  @Input() src: string;
  /**
   * The height of the image and it's container
   */
  @Input() height: number;
}
