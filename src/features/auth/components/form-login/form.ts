import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userRegisterRequest } from '../../../../shared/dto/request/UserRegisterRequest';
import { UserLoginRequest } from '../../../../shared/dto/request/UserLoginRequest';
import { AuthService } from '../../../../app/core/service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/*
USUARIO DE PRUEBA
Email: ivanjauregui80@gmail.com
Contraseña: ....
*/

@Component({
  selector: 'form-login',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  form!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService)


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

      const formValue = this.form.value;


      const user: UserLoginRequest = {
        email: formValue.email,
        password: formValue.password,
      }

      this.authService.login(user).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          window.alert("Sesion Iniciada")
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error de credenciales', err)
      });
    }
  }

