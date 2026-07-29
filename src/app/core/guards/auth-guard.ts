import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  // 1. Si ni siquiera hay token guardado, bloqueamos
  if (!authService.getAccessToken()) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Si ya tenemos los datos del usuario en memoria, permitimos acceso inmediato
  if (authService.currentUser()) {
    return true;
  }

  // 3. Si dimos F5 (currentUser es null), validamos contra el backend
  // Retornamos la petición para que el router espere la respuesta de la API/Interceptor
  return authService.fetchCurrentUser().pipe(
    map(() => true), // Si devolvió 200 OK  o revivió gracias al refresh, permitimos la ruta
    catchError(() => {
      authService.logout();
      return of(false); // Si el refresh se vencio, bloqueamos
    })
  );
};
