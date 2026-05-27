import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  console.log('Guard checked role string:', role);

  // Convert role to lowercase before checking to match both 'Admin' and 'admin' safely
  if (role && role.toLowerCase() === 'admin') {
    return true;
  }

  // If role check fails, fall back to shop page
  return router.createUrlTree(['/shop']);
};