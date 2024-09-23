import { Component, inject } from '@angular/core';
import { routes } from '../../app.routes';
import { Router } from 'express';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  private readonly _authService = inject(AuthService);


  logOut():void{
    this._authService.logOut();
  }

}
