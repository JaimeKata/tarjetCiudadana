import { Component, OnInit } from '@angular/core';
import { WalletIDService } from 'src/app/services/walletid.service';
import { BBDDService } from '../../services/bbdd.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EventoModel } from 'src/app/models/event.model';


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
  public eventCapacity: 'ok'|'ko';
  public capacity: number;

  /**
   * Mensaje informativo 
   */
  information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  
  constructor(private walletIdService: WalletIDService, private dbService: BBDDService) { 
    this.otpStatus = 'pending';
  }

  ngOnInit(): void {
    //sustituir por metodo de solo lectura
    let eventRef: Observable<any> = this.dbService.getCapacity();
    eventRef.subscribe((doc)=>{
      if (doc.exists) {
        const event: EventoModel = doc.data();
        this.capacity = event.capacity;
      } if(this.capacity > 0){ 
        this.eventCapacity = 'ok';
        this.dbService.checkCapacity();
      } else{
        this.eventCapacity = 'ko';
      }
    });
  }

  /** 
   * Metodo que invoca el lector de QRs cuando detecta uno válido
  */
  public scanSuccessHandler(event: any) {
    console.log('QR leido:'+event);
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
    this.scanSuccessHandler("https://demotcv.wallet-id.com/adm/#/tool/checkOtp?userId=a077e5f5-280c-45e1-a8a1-646f09a4c364&otp=2610");
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
    if( acceso == true){
      this.otpStatus = 'ok';
    } else {
      this.otpStatus = 'ko';
    }
  }
}
