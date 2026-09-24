import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { 
  heroMapPin, heroSun, heroSparkles, 
  heroHeart, heroKey, heroArrowLeft, heroExclamationTriangle 
} from '@ng-icons/heroicons/outline';

import { BalnearioResponse } from '../../models/balnearioResponse';
import { BalnearioService } from '../../service/balneario-service';
import { PublicationService } from '../../../publication/service/publication-service';
import { PublicationResponse } from '../../../publication/models/publication-response';
import { PublicationCard } from '../../components/publication-card/publication-card';
import { AmenityService } from '../../../servicios/services/amenity-service';

@Component({
  selector: 'app-balneario-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, CurrencyPipe, PublicationCard], 
  providers: [
    provideIcons({ 
      heroMapPin, heroSun, heroSparkles, 
      heroHeart, heroKey, heroArrowLeft, heroExclamationTriangle 
    })
  ],
  templateUrl: './balneario-detail.html',
  styleUrl: './balneario-detail.css',
})
export class BalnearioDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private balnearioService = inject(BalnearioService);
  private publicationService = inject(PublicationService);
  private amenityService = inject(AmenityService);

  // Estados de datos
  balneario = signal<BalnearioResponse | null>(null);
  publications = signal<PublicationResponse[] | null>(null);
  
  // SEPARADOS: Estados de carga
  isBalnearioLoading = signal<boolean>(true);
  isPublicationsLoading = signal<boolean>(true);
  
  // Estado de error global
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); 
      const id = Number(idParam);
      
      // Verificamos que exista y sea un número válido
      if (idParam && !isNaN(id)) {
        this.loadDetails(id);
        this.loadPublication(id);
      } else {
        this.errorMessage.set('No se proporcionó un ID de balneario válido.');
        this.isBalnearioLoading.set(false);
        this.isPublicationsLoading.set(false);
      }
    });
  }

  private loadDetails(id: number): void {
    this.isBalnearioLoading.set(true);
    this.balnearioService.getById(id).subscribe({
      next: (response) => {
        this.balneario.set(response);
      
        this.isBalnearioLoading.set(false); 
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Error al cargar los detalles del balneario');
        this.isBalnearioLoading.set(false);
      }
    });
  }



  private loadPublication(id: number): void {
     this.isPublicationsLoading.set(true);
     this.publicationService.getAll(id).subscribe({
        next: (response) => {
          this.publications.set(response);
          this.isPublicationsLoading.set(false); 
        },
        error: (err) => {
          console.error("Error al cargar publicaciones: ", err);
          this.publications.set([]); // Lista vacía para que no rompa
          this.isPublicationsLoading.set(false);
        }
     });
  }
}