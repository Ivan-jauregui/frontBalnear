import { Component, Input } from '@angular/core';
import { Resort } from '../../featured-resort-list';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  heroStar, 
  heroMapPin, 
  heroSparkles, 
  heroHeart, 
  heroKey 
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-resort-card',
  imports: [CommonModule,NgIcon],
  providers: [
    provideIcons({ 
      heroStar, 
      heroMapPin, 
      heroSparkles, 
      heroHeart, 
      heroKey 
    })
  ],
  templateUrl: './resort-card.html',
  styleUrl: './resort-card.css',
})
export class ResortCard {
  @Input() resort!: Resort;
}
