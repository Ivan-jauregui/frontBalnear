import { Component, EventEmitter, inject, Input, output, Output, signal } from '@angular/core';
import { AmenityService } from '../../services/amenity-service';
import { Amenity } from '../../models/amenity';

@Component({
  selector: 'amenities-list',
  imports: [],
  templateUrl: './amenities-list.html',
  styleUrl: './amenities-list.css',
})
export class AmenitiesList {
  private amenityService=inject(AmenityService)

  servicios=signal<Amenity[]>([]);
  selected = signal<Set<number>>(new Set());
  isLoading=signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  alertFather = output<Set<number>>();

  ngOnInit():void{
    this.loadAmenities()
  }

  loadAmenities():void{
     this.amenityService.getAll().subscribe({
      next:(data)=>{
        this.servicios.set(data);
        this.isLoading.set(false)
        console.log(this.servicios());
      },
      error:(err)=>{
        this.errorMessage.set(err.message);
        this.isLoading.set(false)
      }
    })
  }
 
}
