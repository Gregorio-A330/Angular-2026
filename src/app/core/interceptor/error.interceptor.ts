import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError(error => {
      let message = 'Erro inesperado';

      if (error.status === 0) {
        message = 'Erro de conexão com o servidor';
      } else if (error.status >= 400 && error.status < 500) {
        message = 'Erro na requisição';
      } else if (error.status >= 500) {
        message = 'Erro interno do servidor';
      }

      errorService.show(message);
      return throwError(() => error);
    })
  );
};