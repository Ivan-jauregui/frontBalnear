import { Component, inject, signal } from '@angular/core';
import { AmenitiesList } from "../../../servicios/components/amenities-list/amenities-list";
import { Amenity } from '../../../servicios/models/amenity';
import { AmenityService } from '../../../servicios/services/amenity-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalnearioRequest } from '../../models/balnearioRequest';
import { BalnearioService } from '../../service/balneario-service';

@Component({
  selector: 'app-create-balneario',
  imports: [AmenitiesList,ReactiveFormsModule],
  templateUrl: './create-balneario.html',
  styleUrl: './create-balneario.css',
})

export class CreateBalneario {
  form!: FormGroup;
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
    this.form=this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      address:['',Validators.required],
      price:['',Validators.required],
      ownerId:['',Validators.required],

    });
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
        const formValue = this.form.value;
  
        console.log("hla")
  
        const balneario: BalnearioRequest = {
          name: formValue.name,
          description: formValue.description,
          address: formValue.address,
          price: formValue.price,
          ownerId: formValue.ownerId,
          amenities: Array.from(this.selected())
        }
  
        this.balnearioService.save(balneario).subscribe({
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
