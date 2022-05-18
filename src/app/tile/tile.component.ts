import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
  <button nbButton hero status="info" *ngIf="!value">{{ value }}</button>
  <button nbButton hero status="danger" *ngIf="value == 'X'">{{ value }}</button>
  <button nbButton hero status="success" *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 3vw !important; }']
})
export class TileComponent {
  @Input()
  value: 'X' | 'O' | null = null;
}
