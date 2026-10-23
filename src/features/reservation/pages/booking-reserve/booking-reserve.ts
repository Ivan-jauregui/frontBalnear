import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core'; // <-- 1. Importa ViewChild
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmailService } from '../../../../shared/services/email-service';
import { BalnearioService } from '../../../balneario/service/balneario-service';
import { BalnearioResponse } from '../../../balneario/models/balnearioResponse';
import { AuthService } from '../../../../app/core/service/auth-service';
import { SolicitudeService } from '../../../solicitude/services/solicitude-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SolicitudeRequest } from '../../../solicitude/models/solicitude-request';
import { UserResponse } from '../../../../shared/dto/response/UserResponse';
import { Row } from '../../../row/model/row';

export interface BookingRequestDTO {
  seaSideResortId: number;
  numberRow: number;
  numberBeachTent: number;
  startDate: string;
  endDate: string;
  payPartial: boolean;
}

@Component({
  selector: 'app-booking-reserve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatCalendar,
    ReactiveFormsModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './booking-reserve.html',
  styleUrl: './booking-reserve.css',
})
export class BookingReserve implements OnInit {
  form: FormGroup;
  authService = inject(AuthService)
  balnearioService = inject(BalnearioService)
  user = signal<UserResponse | null>(null)
  rows = signal<Row[]>([]);
  rowSelectedId = signal<number | null>(null);
  balneario = signal<BalnearioResponse | null>(null)
  balnearioId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    private solicudeService: SolicitudeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.form = fb.group({
      startDate: ['2026-12-01', Validators.required],
      endDate: ['2027-03-31', Validators.required],
      note: ['']
    })
  }

  ngOnInit(): void {
    this.user.set(this.authService.currentUser());
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.balnearioId.set(+idParam)
      this.loadBalneario(+idParam)
      this.loadRows(+idParam)
    }
  }


  private loadBalneario(id: number): void {
    this.balnearioService.getById(id).subscribe({
      next: (response) => {
        this.balneario.set(response);
      },
      error: (err) => {
        console.log("ERROR: se produjo un error en el servido: " + err)
      }
    });
  }

  private loadRows(id: number): void {
    this.balnearioService.getAllRowsBySeaSideResortId(id).subscribe({
      next: (response) => {
        this.rows.set(response);
      },
      error: (err) => {
        console.log("ERROR: se produjo un error en el servido: " + err)
      }
    });
  }

  selectRow(id:number){
    this.rowSelectedId.set(id);
  }
  

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      console.log("User id: " + this.user()?.id)
      console.log("Fila id: " + this.rowSelectedId())
      console.log("Balneario id: " + this.balnearioId())

      const newSolicitude: SolicitudeRequest = {
        userId: this.user()!.id,
        rowId:this.rowSelectedId()!,
        seaSideResortId: this.balnearioId()!,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        note: formValue.note
      }

      this.balnearioService.makeSolicitude(newSolicitude).subscribe({
        next: (data) => {
          this.router.navigate([`/balneario`,this.balnearioId()])
        }
      })
    }
  }
}