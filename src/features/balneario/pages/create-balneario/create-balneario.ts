import { Component, inject, signal } from '@angular/core';
import { AmenitiesList } from "../../../servicios/components/amenities-list/amenities-list";
import { Amenity } from '../../../servicios/models/amenity';
import { AmenityService } from '../../../servicios/services/amenity-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalnearioRequest } from '../../models/balnearioRequest';
import { BalnearioService } from '../../service/balneario-service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroExclamationTriangle, heroSparkles } from '@ng-icons/heroicons/outline';
import { InfrastructureData } from './steps/infrastructure-data/infrastructure-data';

@Component({
  selector: 'app-create-balneario',
  imports: [AmenitiesList, ReactiveFormsModule, NgIcon],
   providers: [
    provideIcons({ 
      heroSparkles, 
      heroExclamationTriangle, 
    })
  ],
  templateUrl: './create-balneario.html',
  styleUrl: './create-balneario.css',
})

export class CreateBalneario {
  form!: FormGroup;
  step = signal<number>(1);
  balneario = signal<Partial<BalnearioRequest>>({});

  private amenityService = inject(AmenityService)
  private balnearioService = inject(BalnearioService)
  private router = inject(Router);

  private fb = inject(FormBuilder);


  
  servicios = signal<Amenity[]>([]);
  selected = signal<Set<number>>(new Set());
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);


  ngOnInit(): void {
    this.loadAmenities()
    this.form = this.fb.group({
      basicData: this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        zone: ['', Validators.required],
        address: ['', Validators.required],
        ownerId: ['', Validators.required],
      }),
      commercialData: this.fb.group({
        basePrice: ['', [Validators.required, Validators.min(1)]],
        seasonalPrice: ['', [Validators.required, Validators.min(1)]],
      }),
      infrastructureData: this.fb.group({
        number: ['', Validators.required],
        firstBeachTent: ['', [Validators.required, Validators.min(1)]],
        lastBeachTent: ['', [Validators.required, Validators.min(1)]],
        tag: ['', Validators.required],
      }),
    });
  }

  get basicData(){return this.form.get('basicData') as FormGroup}
  get commercialData(){return this.form.get('commercialData') as FormGroup}
  get infrastructureData(){return this.form.get('infrastructureData') as FormGroup}


  nextStep(){
    if(this.step()===1 && this.basicData.valid){ 
      this.balneario.update(b =>({...b,...this.basicData.value()}));
      this.step.set(2)
    }
    else if(this.step()===2 && this.commercialData.valid){
      this.balneario.update(b=>({...b,...this.commercialData.value()}))
      this.step.set(3)
    }
    else if(this.step()===3 && this.commercialData.valid){
      this.balneario.update(b=>({...b,...this.infrastructureData.value()}))
      this.step.set(4)
    };
  }

  previousStep(){
    if(this.step() > 1){
      this.step.update(s=>s-1);
    }
  }

  loadAmenities(): void {
    this.amenityService.getAll().subscribe({
      next: (data) => {
        this.servicios.set(data);
        this.isLoading.set(false)
        console.log(this.servicios());
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false)
      }
    })
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
        this.balneario.update(b =>({...b,amenities: Array.from(this.selected())}));
  
        const payload = this.balneario() as BalnearioRequest;


        this.balnearioService.save(payload).subscribe({
          next: (response: any) => {
            console.log(response)
            this.router.navigate([`/balneario/${response.id}/imagen`] );
          },
          error: (err) => console.error('Error de credenciales', err)
        });
      } else {
        console.log('El formulario tiene errores de validación');
      }
    }
  
}