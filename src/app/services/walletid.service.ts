import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WalletIDService {
  url = 'https://demotcv.wallet-id.com/sslsignature';
  user = 'f65790ad-af05-42dd-85d0-5aec81cf617e';
  apiKey = '5qtm06ueo5km4b48265hikl0ul';

  constructor(private http: HttpClient) {

  }

  otpActivo(userId: string, otp: string){
    const urlCompleta: string = this.url.concat('/authorization/list');
    console.log('URLCompleta: ' + urlCompleta);
    this.http.post(urlCompleta,
      {'AuthorizationFilter': { 'toUserId': userId, 'notExpired': true, 'status': 'INIT' } },
      { headers: this.createHeaders() }
    ).
      subscribe(data => { console.log(data); }, (error) => { // sacar de data el Json
        console.log('error from service', error);
        // do further processing
      });
  }
  /* no consigo añadir los headers sin que pete*/
  createHeaders() {
    let autorization = 'Basic ' + btoa(this.user + ':' + this.apiKey);
    let headers = new HttpHeaders()
      .append('Authorization', autorization)
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');
    return headers;
  }
}
