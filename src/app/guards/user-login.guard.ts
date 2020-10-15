import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {


  constructor( private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if ( this.userService.estaAutenticado()){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
