import { Component, input } from '@angular/core';
import { PublicationResponse } from '../../../publication/models/publication-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'publication-card',
  imports: [CommonModule],
  templateUrl: './publication-card.html',
  styleUrl: './publication-card.css',
})
export class PublicationCard {
  publication = input.required<PublicationResponse>();
}
