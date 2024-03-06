import { CanActivateFn } from '@angular/router';

export const authUsersGuard: CanActivateFn = (route, state) => {
  return false;
};
