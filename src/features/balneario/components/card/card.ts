import { Component, input } from '@angular/core';
import { BalnearioResponse } from '../../models/balnearioResponse';
import { NgIcon,provideIcons } from "@ng-icons/core";
import { 
  heroStar, 
  heroMapPin, 
  heroSparkles, 
  heroHeart, 
  heroKey 
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'balneario-card',
  imports: [NgIcon],
  providers: [
    provideIcons({ 
      heroStar, 
      heroMapPin, 
      heroSparkles, 
      heroHeart, 
      heroKey 
    })
  ],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  balneario = input.required<BalnearioResponse>();
}
