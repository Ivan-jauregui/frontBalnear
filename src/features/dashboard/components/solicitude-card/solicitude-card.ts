import { Component, Input } from '@angular/core';
import { SolicitudeResponse } from '../../../solicitude/models/solicitude-response';

@Component({
  selector: 'solicitude-card',
  imports: [],
  templateUrl: './solicitude-card.html',
  styleUrl: './solicitude-card.css',
})
export class SolicitudeCard {
  @Input() solicitude:SolicitudeResponse | undefined;
}
