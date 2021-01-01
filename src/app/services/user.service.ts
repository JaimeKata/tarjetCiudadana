import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
;
  usuarioActivo: UserModel;
  usuarioPrueba: UserModel = {
    name: 'Jaime',
    surname: 'Catalan',
    mail: 'jaimecatmat@gmail.com',
    password: '12345',
    userType: 'admin'
  };

  constructor(private http: HttpClient) { }

  /*
     Crear nuevo user
     https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    Login
    https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  */

  estaAutenticado(){
    if (this.usuarioActivo != null){
      return true;
    }
  }
  login(name: string, surname: string, mail: string, password: string, userType: string){ // prueba para comprobar credenciales
    if ( mail === this.usuarioPrueba.mail && password === this.usuarioPrueba.password){
        this.usuarioActivo = {  // de esta forma guardamos el usuario activo en el servicio
          name,
          surname,
          mail,
          password,
          userType,
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
