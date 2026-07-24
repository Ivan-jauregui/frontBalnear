import { Component, computed, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { BalnearioService } from '../../service/balneario-service';
import { BalnearioResponse } from '../../models/balnearioResponse';
import { BalnearioFilterDto } from '../../models/balnearioFilterDto';
import { Card } from "../../components/card/card";
import { PageResponse } from '../../../../shared/models/pageResponse';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroMagnifyingGlass,
  heroXMark,
  heroArrowPath,
  heroExclamationTriangle,
  heroSparkles,
  heroAdjustmentsHorizontal
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'balneario-list',
  standalone: true,
  imports: [Card, CommonModule, NgIcon],
  providers: [
    provideIcons({
      heroMagnifyingGlass,
      heroXMark,
      heroArrowPath,
      heroExclamationTriangle,
      heroSparkles,
      heroAdjustmentsHorizontal
    })
  ],
  templateUrl: './balneario-list.html',
  styleUrl: './balneario-list.css',
})
export class BalnearioList {
  isZonesMenuOpen = signal<Boolean>(false);
  
  toggleZonesMenu(): void {
     this.isZonesMenuOpen.update(open => !open);
  }

  private readonly balnearioService = inject(BalnearioService);
  private readonly router = inject(Router);

  // 1. Estado base del componente
  readonly currentPage = signal<number>(0);
  readonly pageSize = signal<number>(10);
  
  // SEPARACIÓN CLAVE:
  // - draftFilter: guarda lo que se escribe en los inputs.
  // - appliedFilter: es el que se manda al backend cuando se presiona Buscar.
  readonly draftFilter = signal<BalnearioFilterDto>({ name: '', zone: '' });
  readonly appliedFilter = signal<BalnearioFilterDto>({ name: '', zone: '' });
  
  readonly errorMessage = signal<string | null>(null);

  // 2. queryParams ahora depende de APPLIEDFilter
  readonly queryParams = computed(() => ({
    filter: this.appliedFilter(),
    page: this.currentPage(),
    size: this.pageSize()
  }));
  
  readonly resortsPage: Signal<PageResponse<BalnearioResponse> | null | undefined>;

  readonly isLoading = computed(() => this.resortsPage() === undefined);

  constructor() {
    this.resortsPage = toSignal(
      toObservable(this.queryParams).pipe(
    
        switchMap(({ filter, page, size }) => {
          this.errorMessage.set(null);
          return this.balnearioService.getAll(filter, page, size).pipe(
            catchError((err) => {
              this.errorMessage.set(err?.error?.message || 'Error al comunicarse con el servidor');
              return of(null); 
            })
          );
        })
      ),
      { initialValue: undefined }
    );
  }

  // --- CONTROL DE FILTROS Y PAGINACIÓN ---

  // Actualiza solo el borrador mientras el usuario escribe en el formulario
  updateFilter<K extends keyof BalnearioFilterDto>(field: K, value: BalnearioFilterDto[K]): void {
    this.draftFilter.update(f => ({
      ...f,
      [field]: value === '' ? undefined : value
    }));
  }

  // Acción del botón BUSCAR
  applySearch(): void {
    this.currentPage.set(0);
    this.appliedFilter.set(this.draftFilter()); 
  }

  selectZone(zoneValue: string | '') {
  this.updateFilter('zone', zoneValue);
  this.isZonesMenuOpen.set(false);
  this.applySearch();
}

  resetFilters(): void {
    const emptyFilter = { name: '', zone: '' };
    this.currentPage.set(0);
    this.draftFilter.set(emptyFilter);
    this.appliedFilter.set(emptyFilter); 
  }

  goToPage(page: number): void {
    this.currentPage.set(page); 
  }

  // --- NAVEGACIÓN  ---
  showDetails(id: number): void {
    this.router.navigate([`/balneario/search/${id}`]);
  }
}