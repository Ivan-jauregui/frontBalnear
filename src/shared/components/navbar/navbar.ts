import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  heroSun, 
  heroChevronDown, 
  heroMapPin, 
  heroHeart, 
  heroBars3, 
  heroXMark 
} from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({ 
      heroSun, 
      heroChevronDown, 
      heroMapPin, 
      heroHeart, 
      heroBars3, 
      heroXMark 
    })
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() favoritesCount = 2; // Cantidad mockeada de favoritos guardados
  
  private router = inject(Router);

  isZonesMenuOpen = false;
  isMobileMenuOpen = false;

  toggleZonesMenu(): void {
    this.isZonesMenuOpen = !this.isZonesMenuOpen;
  }

  toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  
  redirectContact(){
    this.router.navigate(['balneario/create'])
  }
}