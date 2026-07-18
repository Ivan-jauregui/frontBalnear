import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // IMPORTANTE
import { BalnearioResponse } from '../../models/balnearioResponse';
import { BalnearioService } from '../../service/balneario-service';
import { ActivatedRoute, RouterModule } from '@angular/router'; // IMPORTANTE para volver atrás
import { NgIcon, provideIcons } from '@ng-icons/core'; // IMPORTANTE para iconos
// Importamos iconos estables de Heroicons Outline
import { 
  heroMapPin, 
  heroSun, 
  heroSparkles, 
  heroHeart, 
  heroKey, 
  heroArrowLeft, 
  heroExclamationTriangle 
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-balneario-detail',
  standalone: true, // Asegurate que diga standalone: true
  imports: [
    CommonModule, // Necesario para pipes y directivas básicas
    RouterModule, // Necesario si ponemos un botón de 'Volver'
    NgIcon,       // Necesario para los iconos
    CurrencyPipe, // Opcional si querés formatear precio acá
  ], 
  providers: [
    // Registramos los iconos que vamos a usar en este componente
    provideIcons({ 
      heroMapPin, 
      heroSun, 
      heroSparkles, 
      heroHeart, 
      heroKey, 
      heroArrowLeft, 
      heroExclamationTriangle 
    })
  ],
  templateUrl: './balneario-detail.html',
  styleUrl: './balneario-detail.css',
})
export class BalnearioDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private balnearioService = inject(BalnearioService);

  balneario = signal<BalnearioResponse | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); 
      if (idParam) {
        const idNumeric = Number(idParam); 
        this.loadDetails(idNumeric);
      } else {
        this.errorMessage.set('No se proporcionó un ID de balneario válido.');
        this.isLoading.set(false);
      }
    });
  }

  private loadDetails(id: number): void {
    this.isLoading.set(true);
    this.balnearioService.getById(id).subscribe({
      next: (response) => {
        this.balneario.set(response);
        this.isLoading.set(false);
        // console.log('Datos del balneario cargados:', response);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Error al cargar los detalles del balneario');
        this.isLoading.set(false);
      }
    });
  }
}