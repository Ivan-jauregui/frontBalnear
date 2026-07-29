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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../app/core/service/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink],
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
  
  authService = inject(AuthService);
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