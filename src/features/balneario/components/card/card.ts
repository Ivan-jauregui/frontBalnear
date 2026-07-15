import { Component, input } from '@angular/core';
import { BalnearioResponse } from '../../models/balnearioResponse';

@Component({
  selector: 'balneario-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  balneario = input.required<BalnearioResponse>();
}
