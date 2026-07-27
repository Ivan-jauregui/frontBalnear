import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth-service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  @Input() set hasRole(roles: string | string[]){
    const requiredRoles = Array.isArray(roles)?roles:[roles]
    const hasPermission = this.authService.hasAnyRole(requiredRoles);

    this.viewContainer.clear();

    if (hasPermission) {
    
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
