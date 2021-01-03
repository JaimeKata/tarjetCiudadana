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
  public scannerEnabled: boolean;
  public otpStatus: 'ok'|'ko'|'pending';
  public capacity: number;

  /**
   * Mensaje informativo 
   */
  information = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  
  constructor(private walletIdService: WalletIDService, private dbService: BBDDService) { 
    this.otpStatus = 'pending';
    this.capacity = -1;
    this.scannerEnabled = false;
  }

  ngOnInit(): void {
    this.readCapacity();
  }
  /**
   * Metodo encargado de leer el aforo disponible
   */
  readCapacity(){
    let eventRef: Observable<any> = this.dbService.getCapacity();
    eventRef.subscribe((doc)=>{
      if (doc.exists) {
        const event: EventoModel = doc.data();
        this.capacity = event.capacity;
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
    // Validamos datos del QR
    const accesoValido: boolean = await this.walletIdService.comprobarOtpActivo(userId, otp);

    if(!accesoValido){
      this.mostrarMensajeAutorizacion(accesoValido);
      return;
    }

    // TODO tratar el rechazo de la promesa
    //validamos el aforo
    this.capacity = await this.dbService.checkCapacity();
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
