import { Component, inject, OnInit, signal } from '@angular/core';
import { BalnearioService } from '../../service/balneario-service';
import { BalnearioResponse } from '../../models/balnearioResponse';
import { Card } from "../../components/card/card";
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  heroMagnifyingGlass, 
  heroXMark, 
  heroArrowPath, 
  heroExclamationTriangle, 
  heroSparkles,
  heroAdjustmentsHorizontal
} from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';

@Component({
  selector: 'balneario-list',
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
export class BalnearioList implements OnInit {

  private balnearioService = inject(BalnearioService);
  private router = inject(Router);
   
  balnearios=signal<BalnearioResponse[]>([]);
  isLoading=signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit():void{
    this.loadBalnearios()
  }

  loadBalnearios():void{
    this.balnearioService.getAll().subscribe({
      next:(data)=>{
        this.balnearios.set(data);
        this.isLoading.set(false)
        console.log(this.balnearios());
      },
      error:(err)=>{
        this.errorMessage.set(err.message);
        this.isLoading.set(false)
      }
    })
  }

  showDetails(id:number){
     this.balnearioService.getById(id).subscribe({
      next:(response)=>{
        this.isLoading.set(false)
        this.router.navigate([`/balneario/search/${response.id}`] );

      },
      error:(err)=>{
        this.errorMessage.set(err.message);
        this.isLoading.set(false)
      }
    })
  }


}
