import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {LocalStorageUlti} from "../ulti/local-storage-ulti";
import {NzMessageService} from "ng-zorro-antd/message";
// import * as url from "url";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  API_IGNORE_HANDLE_ERROR = ['/login','/register'];

  courseId: string | undefined;
  constructor(private router: Router,
              private messageService :NzMessageService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isIgnore = this.API_IGNORE_HANDLE_ERROR.find(apiIgnore => request.url.indexOf(apiIgnore) !== -1) !== undefined;
    if (isIgnore) {
      return next.handle(request);
    } else {

      return next.handle(request)
        .pipe(catchError((err) => this.handleError(err)));
    }
  }

  private handleError(errResponse: HttpErrorResponse) {
    if (errResponse.status === 0) {
      this.messageService.error('Can not connect to server');
    } else if (errResponse.status === 401) {
      LocalStorageUlti.removeLoginInfor();
        this.router.navigate(['/login']);
    } else if(errResponse.status === 400 || errResponse.status === 403 || errResponse.status === 404 || errResponse.status === 500){
      this.router.navigate(['/error'], {queryParams: {'status': errResponse.status}});
    } else if (errResponse.error && errResponse.error.message) {
      this.messageService.error(errResponse.error.message);
    }

    // Return an observable with a user-facing errResponse message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
