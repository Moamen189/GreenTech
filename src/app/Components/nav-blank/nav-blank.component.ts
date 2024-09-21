import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { Router } from 'express';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

}
