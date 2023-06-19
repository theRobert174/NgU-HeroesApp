import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = () : boolean | Observable<boolean> => {
  const authService : AuthService = inject(AuthService);
  const router : Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap( isAuthenticated => {
      if(!isAuthenticated) router.navigate(['/auth/login']);
    }),
  );
}

export const authGuardcanMatch: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
  console.log('AuthGuardcanMatch',{route, segments});
  return checkAuthStatus();
}

export const authGuardcanActivate: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
  console.log('AuthGuardcanActivate', {route, state});

  return checkAuthStatus();
}
