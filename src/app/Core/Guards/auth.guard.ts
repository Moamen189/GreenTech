import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


  const _Router = inject(Router);
  const _PlatForm = inject(PLATFORM_ID);

  if(isPlatformBrowser(_PlatForm)){
     if (localStorage.getItem('userToken') === null) {
    _Router.navigate(['/login']);
    return false;
  }else{

    _Router.navigate(['/home']);

    return true;
  }}else{
    return false;
  }


};
