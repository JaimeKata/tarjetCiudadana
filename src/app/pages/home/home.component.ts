import { Component, OnInit } from '@angular/core';
import { WalletIDService } from 'src/app/services/walletid.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public scannerEnabled = true;
  private information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  urlCompleta: string;
  valoresAcceso: Array<string>;

  constructor(private walletIdService: WalletIDService) { }

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
  
  /**
   * Trocea la URL y comprueba el QR
   * @param event 
   */
  public separarUrl(event){
    this.valoresAcceso = event.split('?');
    const user: string = this.valoresAcceso[1];
    this.valoresAcceso = user.split('&');
    const userId: string = this.valoresAcceso[0].split('=')[1];
    const otp: string = this.valoresAcceso[1].split('=')[1];
    console.log(userId);
    console.log(otp);
    this.walletIdService.otpActivo(userId, otp);
  }

  public autorizacion(acceso: boolean){
    let aforo: boolean;
    aforo = this.comprobarAforo();
    if( acceso == true && aforo == true ){
      window.confirm("Acceso concedido");
    } else {
      window.alert("Acceso denegado");
    }
  }
  comprobarAforo(){
    const aforoMaximo = 100;
    let aforo = 0; 
    if(aforo <= aforoMaximo){
      aforo ++; 
      return true; 
    } else {
      return false;
    }
  }
}
