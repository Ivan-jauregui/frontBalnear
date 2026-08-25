import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroArrowRightSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'form-basic-data',
  imports: [ReactiveFormsModule,NgIcon],
   providers: [
    provideIcons({ 
      heroArrowRightSolid, 
    })
  ],
  templateUrl: './form-basic-data.html',
  styleUrl: './form-basic-data.css',
})
export class FormBasicData {

  form!: FormGroup;
  private fb = inject(FormBuilder);

  private router = inject(Router);
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      zone: ['', Validators.required],
      address: ['', Validators.required],
      ownerId: ['', Validators.required],
    });
  }

  nextStep(){
    this.router.navigate([`/balneario/create/infrastructure-data`])
  }
}
