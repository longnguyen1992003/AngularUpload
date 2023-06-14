import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageUlti} from "../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


  constructor(private activeRouter: ActivatedRoute,) {
  }

  API_IGNORE_ACCESS_TOKEN = ['/login','/register'];

  token: any;


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.token = this.activeRouter.snapshot.queryParamMap.get("token");
    const isIgnore = this.API_IGNORE_ACCESS_TOKEN.find(apiIgnore => request.url.indexOf(apiIgnore) !== -1) !== undefined;
    // if(this.token){
    //   const authReq = request.clone({
    //     headers: request.headers.set('Authorization', 'Bearer ' + this.token)
    //   });
    //   return next.handle(authReq);
    // }
    if (!isIgnore && LocalStorageUlti.getAccessToken()) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + LocalStorageUlti.getAccessToken())
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
