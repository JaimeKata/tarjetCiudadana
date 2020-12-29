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

  constructor(private http: HttpClient) {

  }
  
  /**
   * Comprueba si el OTP es correcto
   *
   * @param userId 
   * @param otp 
   */
  comprobarOtpActivo(userId: string, otp: number): Promise<boolean>{
    return new Promise<boolean>((resolver, rechazar) => { 
      const urlCompleta: string = this.url.concat('/authorization/list');
      console.log('URLCompleta: ' + urlCompleta);
      this.http.post(urlCompleta,
        {'AuthorizationFilter': { 'toUserId': userId, 'notExpired': true, 'status': 'INIT' } },
        { headers: this.createHeaders() }
      ).
        subscribe( 
          (data: any) => {
            resolver(this.comprobarDatos(otp, data));
          }, 
          (error) => {
            console.log('error from service', error);
            // do further processing
            // TODO Mostrar un error por fallo catastrófico      
        });
     }
    );
  }
  createHeaders() {
    let autorization = 'Basic ' + btoa(this.user + ':' + this.apiKey);
    let headers = new HttpHeaders()
      .append('Authorization', autorization)
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  /**
   * Contrasta OTP con backend
   * 
   * @param otp Otp leido por QR
   * @param data Registro recibido del backend
   */
  comprobarDatos(otp: number, data: any):boolean{
  
    if(!data.Authorization || data.Authorization.length===0){
      return false;
    } else if(data.Authorization[0]?.otp === otp) {
      return true;
    }

    return false;
  }
}
