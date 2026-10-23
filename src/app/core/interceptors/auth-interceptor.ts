import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();


  const isAuthUrl = req.url.includes('/auth/login') || 
                    req.url.includes('/auth/register') || 
                    req.url.includes('/auth/refresh-token');

  let authReq = req;
  if (token && !isAuthUrl) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si da 401 y NO es una URL de autenticación, procedemos al Refresh Token automático
      if (error.status === 401 && !isAuthUrl) {
        
        return authService.refreshToken().pipe(
          switchMap((res) => {
            // Clonamos la petición ORIGINAL con el NUEVO token obtenido
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            // Si el Refresh Token también falló, limpiamos sesión y redirigimos
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
