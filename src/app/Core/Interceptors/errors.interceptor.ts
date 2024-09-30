import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _toastrService = inject(ToastrService);
  return next(req).pipe(catchError((error) => {
    // console.log('Error:', error);
    _toastrService.error(error.error.message, 'Green-Tech');
    return throwError(() => error);
  }));
};
