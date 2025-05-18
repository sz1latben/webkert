import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AngularFireAuth);
  const router = inject(Router);

  const user = await firstValueFrom(auth.authState);
  return user ? true : router.createUrlTree(['/bejelentkezes']);
};
