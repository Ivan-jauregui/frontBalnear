import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userRegisterRequest } from '../../../../../shared/dto/request/UserRegisterRequest';
import { UserLoginRequest } from '../../../../../shared/dto/request/UserLoginRequest';
import { AuthService } from '../../../shared/service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'form-login',
  imports: [ReactiveFormsModule],
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

    if (this.form.valid) {
      const formValue = this.form.value;

      console.log("hla")

      const user: UserLoginRequest = {
        email: formValue.email,
        password: formValue.password,
      }

      this.authService.login(user).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error de credenciales', err)
      });
    } else {
      console.log('El formulario tiene errores de validación');
    }
  }

}
