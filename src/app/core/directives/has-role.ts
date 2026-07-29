import { Directive, effect, inject, Input, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth-service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private requiredRoles = signal<string[]>([]);

  @Input() set hasRole(roles: string | string[]) {
    // Normalizamos el input a un Array
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    this.requiredRoles.set(rolesArray);
  }

  constructor() {
    // El effect se re-ejecuta automáticamente cada vez que cambia authService.currentUser()
    effect(() => {
      const roles = this.requiredRoles();
      const hasPermission = this.authService.hasAnyRole(roles);

      this.viewContainer.clear();

      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
