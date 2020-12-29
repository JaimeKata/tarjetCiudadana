import { Component, OnInit } from '@angular/core';
import { WalletIDService } from 'src/app/services/walletid.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Activa / desactiva el lector de qr
   */
  public scannerEnabled = true;

  public otpStatus: 'ok'|'ko'|'pending';
  /**
   * Mensaje informativo 
   */
  information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  
  constructor(private walletIdService: WalletIDService) { 
    this.otpStatus = 'pending';
  }

  ngOnInit(): void {
  }

  /** 
   * Metodo que invoca el lector de QRs cuando detecta uno válido
  */
  public scanSuccessHandler(event: any) {
    this.scannerEnabled = false;
    this.information = 'Espera recuperando información... ';
    this.separarUrl(event);
  }

  /**
   * Muestra el lector de QR (lo inicializa y muestra)
   */
  public enableScanner() {
   this.scannerEnabled = !this.scannerEnabled;
   this.otpStatus = 'pending';
   /**
    * TODO quitar linea de debug
    */
   // this.scanSuccessHandler("https://demotcv.wallet-id.com/adm/#/tool/checkOtp?userId=a077e5f5-280c-45e1-a8a1-646f09a4c364&otp=1039");
  }
  
  /**
   * Trocea la URL y comprueba el QR
   * @param event 
   */
  public async separarUrl(event){
    let valoresAcceso = event.split('?');
    const user: string = valoresAcceso[1];
    valoresAcceso = user.split('&');
    const userId: string = valoresAcceso[0].split('=')[1];
    const otp: number = parseInt(valoresAcceso[1].split('=')[1]);
    console.log(userId);
    console.log(otp);
    // Validamos datos
    
    const accesoValido: boolean = await this.walletIdService.comprobarOtpActivo(userId, otp);
    this.mostrarMensajeAutorizacion(accesoValido);
  }

  private mostrarMensajeAutorizacion(acceso: boolean){
    let aforo: boolean;
    aforo = this.comprobarAforo();
    if( acceso == true && aforo == true ){
      this.otpStatus = 'ok';
    } else {
      this.otpStatus = 'ko';
    }
  }

  /**
   * TODO arreglar y pasar a firebase
   */
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
