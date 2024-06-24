import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (!token) {
    alert('Ban khong co quyen truy cap,vui long kiem tra lai !');
    router.navigateByUrl('/signin');
    return false;
  }
  return true;
};
