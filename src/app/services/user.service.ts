import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBUxpt_M7-wk_JDo3n1S_sIVBoBxCe7xG0';


  usuarioActivo: UserModel;
  usuarioPrueba: UserModel = {
    nombre: 'Jaime',
    apellido: 'Catalan',
    mail: 'jaimecatmat@gmail.com',
    password: '12345',
    tipoUSer: 'admin'
  };

  constructor(private http: HttpClient) { }

  /*/
     Crear nuevo user
     https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    Login
    https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  /*/

  estaAutenticado(){
    if (this.usuarioActivo != null){
      return true;
    }
  }
  /*/
  login(usuario: UserModel){ // comprobamos los credenciales contra firebase
    const userData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/signInWithPassword?key=${this.apiKey}`,
      userData
    );

  }
  /*/
  login(nombre: string, apellido: string, mail: string, password: string, tipoUSer: string){ // prueba para comprobar credenciales
    if ( mail === this.usuarioPrueba.mail && password === this.usuarioPrueba.password){
        this.usuarioActivo = {  // de esta forma guardamos el usuario activo en el servicio
          nombre,
          apellido,
          mail,
          password,
          tipoUSer,
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
