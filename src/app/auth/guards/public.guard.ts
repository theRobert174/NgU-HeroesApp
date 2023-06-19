import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, pipe, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = () : boolean | Observable<boolean> => {
  const authService : AuthService = inject(AuthService);
  const router : Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap( isAuthenticated => {
      if(isAuthenticated) router.navigate(['/']);
    }),
    map( isAuthenticated => !isAuthenticated )
  );
}

export const publicGuardcanMatch: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
  console.log('AuthGuardcanMatch',{route, segments});
  return checkAuthStatus();
}

export const publicGuardcanActivate: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
  console.log('AuthGuardcanActivate', {route, state});

  return checkAuthStatus();
}
