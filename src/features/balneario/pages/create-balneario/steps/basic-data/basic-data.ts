import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBasicData } from '../../components/form-basic-data/form-basic-data';

@Component({
  selector: 'app-basic-data',
  imports: [FormBasicData],
  templateUrl: './basic-data.html',
  styleUrl: './basic-data.css',
})
export class BasicData {
  form!:FormGroup;
  private fb = inject(FormBuilder);

}
