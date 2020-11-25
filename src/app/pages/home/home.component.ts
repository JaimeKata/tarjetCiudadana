import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public scannerEnabled = true;
  private information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  urlCompleta: string;
  url = 'https://demotcv.wallet-id.com/';
  valoresAcceso: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

  public scanSuccessHandler(event: any) {
    this.scannerEnabled = false;
    this.information = 'Espera recuperando información... ';
    alert ('Leido ' + event);
    this.separarUrl(event);
  }
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  }
  public separarUrl(event){
    this.valoresAcceso = event.split('?');
    const user: string = this.valoresAcceso[1];
    this.valoresAcceso = user.split('=');
    const userId: string = this.valoresAcceso[1];
    const otp: string = this.valoresAcceso[2];
    console.log(userId);
    console.log(otp);
  }
}
