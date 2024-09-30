import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _sppiner = inject(NgxSpinnerService);

  _sppiner.show();
  return next(req).pipe( finalize (()=>{
    _sppiner.hide();
  }) ) ;
};
