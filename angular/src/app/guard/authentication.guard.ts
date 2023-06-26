import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageUlti} from "../ulti/local-storage-ulti";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (LocalStorageUlti.getAccessToken()) {

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
