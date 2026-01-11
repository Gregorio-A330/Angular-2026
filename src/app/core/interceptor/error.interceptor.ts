import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { ERROR_MESSAGES } from '../constants/error-messages';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError(error => {
      let message = ERROR_MESSAGES.UNKNOWN;;

      if (error.status === 0) {
        message = ERROR_MESSAGES.CONNECTION;
      } else if (error.status >= 400 && error.status < 500) {
        message = ERROR_MESSAGES.CLIENT;
      } else if (error.status >= 500) {
        message = ERROR_MESSAGES.SERVER;
      }

      errorService.show(message);
      return throwError(() => error);
    })
  );
};