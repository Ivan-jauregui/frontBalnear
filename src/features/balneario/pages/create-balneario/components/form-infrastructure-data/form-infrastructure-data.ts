import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { provideIcons, NgIcon } from '@ng-icons/core';
import { 
  heroPlusSolid, 
  heroTrashSolid, 
  heroSquares2x2Solid, 
  heroArrowRightSolid 
} from '@ng-icons/heroicons/solid';

@Component({
  selector: 'form-infrastructure-data',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NgIcon
  ],
  providers: [
    provideIcons({ 
      heroPlusSolid, 
      heroTrashSolid, 
      heroSquares2x2Solid, 
      heroArrowRightSolid 
    })
  ],
  templateUrl: './form-infrastructure-data.html',
  styleUrl: './form-infrastructure-data.css',
})
export class FormInfrastructureData implements OnInit {

  form!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });

    // Filas iniciales por defecto
    this.addRow('Primera fila frente al mar - Vista directa');
    this.addRow('Fila central - Salida rápida al pasillo principal');
    this.addRow('Cerca del sector de juegos e inflables');
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  private createRowGroup(defaultFeature: string = ''): FormGroup {
    return this.fb.group({
      capacity: [18, [Validators.required, Validators.min(1)]],
      features: [defaultFeature, Validators.required]
    });
  }

  addRow(defaultFeature: string = ''): void {
    this.rows.push(this.createRowGroup(defaultFeature));
  }

  removeRow(index: number): void {
    if (this.rows.length > 1) {
      this.rows.removeAt(index);
    }
  }

  // Total de carpas calculadas
  getTotalCarpas(): number {
    return this.rows.controls.reduce((acc, control) => acc + (Number(control.value.capacity) || 0), 0);
  }

  getRange(count: number): number[] {
    const safeCount = Math.max(0, Number(count) || 0);
    return Array.from({ length: safeCount }, (_, i) => i + 1);
  }

  nextStep(): void {
    if (this.form.valid) {
      console.log('Distribución de Carpas por Fila:', this.form.value);
      // Navegación al siguiente paso:
      // this.router.navigate(['/balneario/crear/services-data']);
    }
  }
}