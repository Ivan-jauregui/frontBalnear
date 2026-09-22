import { Component, inject, signal, OnInit } from '@angular/core';
import { AmenitiesList } from "../../../servicios/components/amenities-list/amenities-list";
import { Amenity } from '../../../servicios/models/amenity';
import { AmenityService } from '../../../servicios/services/amenity-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalnearioRequest } from '../../models/balnearioRequest';
import { BalnearioService } from '../../service/balneario-service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroExclamationTriangle, heroSparkles } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-balneario',
  standalone: true,
  imports: [AmenitiesList, ReactiveFormsModule, NgIcon, CommonModule ],
  providers: [
    provideIcons({ 
      heroSparkles, 
      heroExclamationTriangle, 
    })
  ],
  templateUrl: './create-balneario.html',
  styleUrl: './create-balneario.css',
})
export class CreateBalneario implements OnInit {
  form!: FormGroup;
  step = signal<number>(3);
  rows:number=1;
  balneario = signal<Partial<BalnearioRequest>>({});

  private amenityService = inject(AmenityService);
  private balnearioService = inject(BalnearioService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  servicios = signal<Amenity[]>([]);
  selected = signal<Set<number>>(new Set());
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAmenities();
    
    // Nueva estructura adaptada a tu JSON deseado
    this.form = this.fb.group({
      // Datos raíz (Paso 1)
      name: ['', Validators.required],
      description: ['', Validators.required],
      zone: ['', Validators.required],
      address: ['', Validators.required],
      ownerId: [1, Validators.required], // Se inicializa por defecto en 1 o vacío según necesites
      startDate: ['2026-12-01', Validators.required],
      endDate: ['2027-03-31', Validators.required],

      // Array dinámico de filas (Paso 3)
      rows: this.fb.array([
        this.crearFilaCarpas(1) // Inicia con la primera fila por defecto
      ]),

      // Objeto anidado de tarifas (Paso 2)
      rates: this.fb.group({
        basePrice: ['', [Validators.required, Validators.min(1)]],
        seasonalPrice: ['', [Validators.required, Validators.min(1)]],
      }),
    });
  }

  // Estructurador para añadir filas al array dinámico
  crearFilaCarpas(numeroFila: number): FormGroup {
    return this.fb.group({
      number: [numeroFila, Validators.required],
      firstBeachTent: ['', [Validators.required, Validators.min(1)]],
      lastBeachTent: ['', [Validators.required, Validators.min(1)]],
      tag: ['', Validators.required],
    });
  }
  // Getter fundamental para iterar e interactuar con las carpas en el HTML
  get rowsArray(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  // Métodos dinámicos para añadir o quitar filas desde el HTML (Paso 3)
  agregarFila(): void {
    const siguienteNumero = this.rowsArray.length + 1;
    this.rowsArray.push(this.crearFilaCarpas(siguienteNumero));
  }

  eliminarFila(index: number): void {
    if (this.rowsArray.length > 1) {
      this.rowsArray.removeAt(index);
    }
  }

  // GETTERS DE VALIDACIÓN INDEPENDIENTES PARA TUS STEPS
  get isBasicDataValid(): boolean {
    const fields = ['name', 'description', 'zone', 'address', 'ownerId', 'startDate', 'endDate'];
    return fields.every(field => this.form.get(field)?.valid);
  }

  get isRatesDataValid(): boolean {
    return (this.form.get('rates') as FormGroup).valid;
  }

  get isRowsValid(): boolean {
    return this.rowsArray.valid;
  }

  // LOGICA DINÁMICA POR PASOS ACTUALIZADA
  nextStep() {
    if (this.step() === 1 && this.isBasicDataValid) { 
      this.step.set(2);
    }
    else if (this.step() === 2 && this.isRatesDataValid) {
      this.step.set(3);
    }
    else if (this.step() === 3 && this.isRowsValid) {
      this.step.set(4); // Paso final de los Amenities antes de guardar
    }
  }

  previousStep() {
    if (this.step() > 1) {
      this.step.update(s => s - 1);
    }
  }

  loadAmenities(): void {
    this.amenityService.getAll().subscribe({
      next: (data) => {
        this.servicios.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      }
    });
  }

  toggleSeleccion(id: number): void {
    this.selected.update(setActual => {
      const newSet = new Set(setActual);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  save(): void {
    if (this.form.valid) {
      // 1. Extraemos todo el valor estructurado del formulario en un objeto plano base
      const formValue = this.form.value;

      // 2. Construimos el payload combinándolo con el array de Amenities seleccionados
      const payload: BalnearioRequest = {
        ...formValue,
        amenities: Array.from(this.selected())
      };

      console.log('JSON Estructurado Final:', payload);

      this.balnearioService.save(payload).subscribe({
        next: (response: any) => {
          this.router.navigate([`/balneario/${response.id}/imagen`]);
        },
        error: (err) => console.error('Error al guardar balneario', err)
      });
    } else {
      console.log('El formulario total tiene errores de validación');
    }
  }
}
