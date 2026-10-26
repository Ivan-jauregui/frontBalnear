import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BeachTent } from '../../../beach-tents/models/beach-tent';

@Component({
  selector: 'app-beachtent-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './beachtent-modal.html',
  styleUrl: './beachtent-modal.css',
})
export class BeachtentModal {
 constructor(
    public dialogRef: MatDialogRef<BeachtentModal>,
    @Inject(MAT_DIALOG_DATA) public beachTent: BeachTent
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }
}
