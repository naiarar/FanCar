import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const comToken = (request: HttpRequest<unknown>, token: string | null) =>
  token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  if (!request.url.startsWith(environment.apiUrl) || request.url.includes('/token/')) {
    return next(request);
  }

  return next(comToken(request, authService.getToken())).pipe(
    catchError((erro: unknown) => {
      if (!(erro instanceof HttpErrorResponse) || erro.status !== 401 || !authService.isLoggedIn()) {
        return throwError(() => erro);
      }
      return authService.renovarToken().pipe(
        switchMap((token) => next(comToken(request, token))),
        catchError((erroRenovacao: unknown) => {
          authService.logout();
          return throwError(() => erroRenovacao);
        }),
      );
    }),
  );
};
