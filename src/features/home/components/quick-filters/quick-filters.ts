import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  heroSparkles, 
  heroHeart, 
  heroKey, 
  heroFire, 
  heroUserGroup 
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-quick-filters',
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({ 
      heroSparkles, 
      heroHeart, 
      heroKey, 
      heroFire, 
      heroUserGroup 
    })
  ],
  templateUrl: './quick-filters.html',
  styleUrl: './quick-filters.css',
})
export class QuickFilters {
  @Output() filterSelected = new EventEmitter<string>();

  emitFilter(filterType: string): void {
    this.filterSelected.emit(filterType);
  }
}
