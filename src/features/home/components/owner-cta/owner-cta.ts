import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCurrencyDollar, heroBolt, heroBookOpen } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-owner-cta',
  imports: [CommonModule, NgIcon],
  templateUrl: './owner-cta.html',
  providers: [
    provideIcons({ heroCurrencyDollar, heroBolt, heroBookOpen })
  ],
  styleUrl: './owner-cta.css',
})
export class OwnerCta {
  @Output() registerClick = new EventEmitter<void>();

  onRegisterClick(): void {
    this.registerClick.emit();
  }
}
