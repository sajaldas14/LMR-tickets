import { CanActivateFn } from '@angular/router';

export const authSuppliersGuard: CanActivateFn = (route, state) => {
  return false;
};
