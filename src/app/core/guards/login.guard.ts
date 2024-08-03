import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from 'express';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  if (authService.isLogged()) {
    router.navigate(['/home'])
    return false;
  }
  return false;
};
