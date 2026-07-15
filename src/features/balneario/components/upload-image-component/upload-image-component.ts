import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BalnearioService } from '../../service/balneario-service';

@Component({
  selector: 'upload-image-component',
  imports: [],
  templateUrl: './upload-image-component.html',
  styleUrl: './upload-image-component.css',
})
export class UploadImageComponent {
private route = inject(ActivatedRoute);
  private router = inject(Router);
  private resortService = inject(BalnearioService);


  balnearioId!: number;
  archivoSeleccionado: File | null = null;
  vistaPreviaUrl: string | null = null;
  cargando = false;

  ngOnInit(): void {
    // Leemos el ID que viene en la URL (/balneario/12/imagen)
    this.balnearioId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.archivoSeleccionado = input.files[0];

      // Vista previa local antes de subir
      const reader = new FileReader();
      reader.onload = () => (this.vistaPreviaUrl = reader.result as string);
      reader.readAsDataURL(this.archivoSeleccionado);
    }
  }

  subirYFinalizar(): void {
    if (!this.archivoSeleccionado || !this.balnearioId) return;


    this.cargando = true;
    this.resortService.uploadImage(this.balnearioId, this.archivoSeleccionado).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al subir la imagen:', err);
      }
    });
  }

  // Opción por si el usuario prefiere no subir imagen ahora
  omitir(): void {
    this.router.navigate(['/']);
  }
}
