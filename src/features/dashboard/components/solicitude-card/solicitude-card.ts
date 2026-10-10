import { Component, Input } from '@angular/core';
import { SolicitudeResponse } from '../../../solicitude/models/solicitude-response';
import { CommonModule, DatePipe } from '@angular/common';
import { SolicitudeState } from '../../../solicitude/enum/solicitude-state';
import { Router } from '@angular/router';

@Component({
  selector: 'solicitude-card',
  imports: [CommonModule,DatePipe],
  templateUrl: './solicitude-card.html',
  styleUrl: './solicitude-card.css',
})
export class SolicitudeCard {
  @Input() solicitude:SolicitudeResponse | undefined;
  protected readonly SolicitudeState = SolicitudeState; 

  constructor(private router:Router){}

  goDetails(id:number){
    this.router.navigate(["dashboard/solicitude/details/",id])
  }
}
