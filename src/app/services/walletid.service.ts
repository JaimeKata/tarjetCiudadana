import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HomeComponent } from 'src/app/pages/home/home.component';


@Injectable({
  providedIn: 'root'
})
export class WalletIDService {
  url = 'https://demotcv.wallet-id.com/sslsignature';
  user = 'f65790ad-af05-42dd-85d0-5aec81cf617e';
  apiKey = '5qtm06ueo5km4b48265hikl0ul';
  public autorizacion: string; 


  constructor(private http: HttpClient, private respuesta: HomeComponent) {

  }

  otpActivo(userId: string, otp: string){
    const urlCompleta: string = this.url.concat('/authorization/list');
    console.log('URLCompleta: ' + urlCompleta);
    this.http.post(urlCompleta,
      {'AuthorizationFilter': { 'toUserId': userId, 'notExpired': true, 'status': 'INIT' } },
      { headers: this.createHeaders() }
    ).
      subscribe( (data: any) => { this.autorizacion = data; }, (error) => { // sacar de data el Json
        console.log('error from service', error);
        // do further processing
        this.comprobarDatos(otp);
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
      this.respuesta.autorizacion(acceso);
    } else {
      otpLeido = respAutorizacion?.otp;
    }
    if(otpLeido == otp){
      acceso = true;
      this.respuesta.autorizacion(acceso); 
    }
  }
}
