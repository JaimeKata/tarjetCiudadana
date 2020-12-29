import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class WalletIDService {
  url = environment.url;
  user = environment.user;
  apiKey = environment.apiKey;

 public autorizacion: string; 

  constructor(private http: HttpClient) {

  }
  
  /**
   * Comprueba si el OTP es correcto
   **/
  otpActivo(userId: string, otp: string){
    const urlCompleta: string = this.url.concat('/authorization/list');
    console.log('URLCompleta: ' + urlCompleta);
    this.http.post(urlCompleta,
      {'AuthorizationFilter': { 'toUserId': userId, 'notExpired': true, 'status': 'INIT' } },
      { headers: this.createHeaders() }
    ).
      subscribe( 
        (data: any) => {
           this.autorizacion = data; 
           this.comprobarDatos(otp);
        }, 
        (error) => {
          console.log('error from service', error);
          // do further processing
          // TODO Mostrar un error por fallo catastrófico      
      });
  }
  createHeaders() {
    let autorization = 'Basic ' + btoa(this.user + ':' + this.apiKey);
    let headers = new HttpHeaders()
      .append('Authorization', autorization)
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  comprobarDatos(otp: string){
    let otpLeido: string;
    let acceso: boolean; 
    const respAutorizacion = JSON.parse(this.autorizacion);
    if(respAutorizacion === null){
      acceso = false; 
      // this.respuesta.autorizacion(acceso);
    } else {
      otpLeido = respAutorizacion?.otp;
    }
    if(otpLeido == otp){
      acceso = true;
      // this.respuesta.autorizacion(acceso); 
    }
  }
}
