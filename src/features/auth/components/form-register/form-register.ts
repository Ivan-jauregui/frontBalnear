import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../app/core/service/auth-service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { userRegisterRequest } from '../../../../shared/dto/request/UserRegisterRequest';
import { CommonModule } from '@angular/common';

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Si coinciden o aún no cargaron valores, no devolvemos error
  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null;
  }

  // Devolvemos el error en el control de confirmación
  confirmPassword.setErrors({ passwordMismatch: true });
  return { passwordMismatch: true };
};


@Component({
  selector: 'form-register',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './form-register.html',
  styleUrl: './form-register.css',
})
export class FormRegister {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);


  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
     confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator });
  }


  get passwordsDoNotMatch(): boolean {
    const confirm = this.form.get('confirmPassword');
    return !!(confirm?.hasError('passwordMismatch') && confirm?.touched);
  }

  register(): void {
   if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

      const formValue = this.form.value;

      const user: userRegisterRequest = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
      }

  
      this.authService.register(user).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          window.alert("Sesion Iniciada")
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error de credenciales', err)
      })
  }
}
