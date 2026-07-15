import { Component, OnInit } from '@angular/core';
import { ResortCard } from "./components/resort-card/resort-card";
import { CommonModule } from '@angular/common';

// Interfaz para tipar los datos
export interface Resort {
  id: number;
  name: string;
  zone: string;
  price: number;
  imageUrl: string;
  hasPool: boolean;
  isPetFriendly: boolean;
  hasParking: boolean;
}

@Component({
  selector: 'app-featured-resort-list',
  imports: [ResortCard,CommonModule],
  templateUrl: './featured-resort-list.html',
  styleUrl: './featured-resort-list.css',
})
export class FeaturedResortList implements OnInit {

   resorts: Resort[] = [
    {
      id: 1,
      name: 'Balneario Portofino',
      zone: 'Playa Grande',
      price: 45000,
      imageUrl: 'https://images.unsplash.com/photo-1473116763269-25541579ff61?auto=format&fit=crop&w=800&q=80',
      hasPool: true,
      isPetFriendly: false,
      hasParking: true
    },
    {
      id: 2,
      name: 'Parador Arena Beach',
      zone: 'Zona Sur',
      price: 55000,
      imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
      hasPool: true,
      isPetFriendly: true,
      hasParking: true
    },
    {
      id: 3,
      name: 'Balneario 12',
      zone: 'Punta Mogotes',
      price: 35000,
      imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
      hasPool: true,
      isPetFriendly: true,
      hasParking: false
    },
    {
      id: 4,
      name: 'Alicante Club de Mar',
      zone: 'La Perla',
      price: 38000,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      hasPool: false,
      isPetFriendly: false,
      hasParking: true
    }
  ];

  ngOnInit(): void {
    // Acá en el futuro harías el .subscribe() a tu Spring Boot.
    // Por ahora, Angular lee directamente el array de arriba.
  }

  onFilter(filterType: string) {
    console.log('Filtrando por:', filterType);
  }
}
