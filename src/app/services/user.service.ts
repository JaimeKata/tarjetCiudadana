import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarioPrueba: UserModel = {
    mail: 'jaimecatmat@gmail.com',
    password: '12345'
  };

  usuarioActivo: UserModel;

  constructor() { }

  estaAutenticado(){
    if (this.usuarioActivo != null){
      return true;
    }
  }

  login(mail: string, password: string){ // prueba para comprobar credenciales
    if ( mail === this.usuarioPrueba.mail && password === this.usuarioPrueba.password){
        this.usuarioActivo = {  // de esta forma guardamos el usuario activo en el servicio
          mail,
          password
        };
        console.log('Login Correcto');
        return true;
    }
  }

  logOut(){ // cuando salimos de la aplicacion llamamos al metodo para dejar el user activo a null
    this.usuarioActivo = null;
  }

  getUsuarioActivo(){
    if (this.usuarioActivo != null){
      return this.usuarioActivo;
    }
  }





}
