import { Component, inject, OnInit, signal } from '@angular/core';
import { BalnearioService } from '../../service/balneario-service';
import { BalnearioResponse } from '../../models/balnearioResponse';
import { Card } from "../../components/card/card";

@Component({
  selector: 'balneario-list',
  imports: [Card],
  templateUrl: './balneario-list.html',
  styleUrl: './balneario-list.css',
})
export class BalnearioList implements OnInit {

  private balnearioService = inject(BalnearioService);
   
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
}
