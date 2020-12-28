import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, finalize, retry} from 'rxjs/operators';
import {JWT_NAME} from '../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtHelper: JwtHelperService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(JWT_NAME);
    if (token && !this.jwtHelper.isTokenExpired(token)){
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest).pipe(
        // Retry Failure
        retry(2),
        // Handle Error
        catchError((error: HttpResponse<any>) => {
          return throwError(error);
        }),
        // Profiling
        finalize(() => {
          const profileMsg = `${request.method} "${request.urlWithParams}"`;
          console.log(profileMsg);
        })
      );
    }else {
      return next.handle(request)
    }
  }
}
