import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn) {
      let newRequest = request.clone({
        url: `${environment.apiUrl}${request.url}`,
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          Accept: 'application/json'
        },
      });
      return next.handle(newRequest);
    }
    let newRequest = request.clone({
      url: `${environment.apiUrl}/${request.url}`,
      setHeaders: {
        Accept: 'application/json'
      },
    });
    return next.handle(newRequest);
  }
}
