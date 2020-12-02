import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Firebase {

  constructor(private http: HttpClient, private headers: Headers, private request: HttpRequest<string>) {

  }

  otpActivo(url: string, userId: string, otp: string){
    const urlCompleta: string = url.concat('/authorization/list');
    this.http.post(urlCompleta, {'AuthorizationFilter ' : { ' toUserId ': ' {{userId}} ', ' notExpired ': true, ' status': ' INIT'}}).
    subscribe( data => { console.log(data);
    });
  }
  /* no consigo añadir los headers sin que pete*/
  createAuthorizationHeader(headers: Headers){
    return headers.append('Authorization', 'Basic ' +
      btoa('jaimecatmat@gmail.com:Calahorra96'));
  }
}
