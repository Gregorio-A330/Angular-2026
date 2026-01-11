import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ErrorService } from '../services/error.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const errorService = inject(ErrorService);

  loadingService.show();
  errorService.clear();

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );

  /**
   * finalize
   *  executa sempre
   *  sucesso ou erro 
   *  perfeito para loading
   */
};