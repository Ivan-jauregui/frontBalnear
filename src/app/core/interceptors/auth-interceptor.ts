import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  // 1. Si hay Access Token, lo adjuntamos en los Headers
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 2. Si da 401 Unauthorized y NO es la llamada de login o refresh
      if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/refresh-token')) {
        
        // 3. Pedimos un nuevo Access Token usando el Refresh Token
        return authService.refreshToken().pipe(
          switchMap((res) => {
            // 4. Si el refresh fue exitoso, clonamos la petición ORIGINAL con el NUEVO token y la reenviamos
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            // 5. Si el Refresh Token también venció o falló, cerramos sesión
            authService.logout();

            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};