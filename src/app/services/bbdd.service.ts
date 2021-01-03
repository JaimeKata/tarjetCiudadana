import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoModel } from 'src/app/models/event.model';
import { UserModel } from 'src/app/models/user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';
import { promise } from 'protractor';




@Injectable({
  providedIn: 'root'
})

export class BBDDService {

  constructor(private dbService: AngularFirestore, private http: HttpClient) { 

  }
  /**
   * Comprobamos la capacidad del evento
   * 
   */
  checkCapacity(): Promise<number>{
    return new Promise((resolver, rechazar) =>{
      //coleccion de evento
      //recuperamos el evento por id
      let docRef = this.dbService.collection(environment.collectionId).doc(environment.eventId);
      docRef.get().subscribe((doc) => {
      if (doc.exists) {
        const event: EventoModel = doc.data();
        console.log("Evento:", event);
        const newCapacity = event.capacity -1;
        if(newCapacity>=0){
          docRef.update({capacity: newCapacity });
          resolver(newCapacity);
        } else{
          rechazar(newCapacity);
        }
      } else {
          // doc.data() will be undefined in this case
          console.log('No se ha encontrado el evento');
          rechazar(-1);
        }
      });
    });
  }

  /**
   * OBtiene la capacidad actual de un evento desde firebase
   */
  getCapacity(): Observable<any>{
    let capacity: number; 
    let docRef = this.dbService.collection(environment.collectionId).doc(environment.eventId);
    return docRef.get();
  }

  /**
   * 
   * @param usuario usuario que se va a acceder
   */
/*
  login(usuario: UserModel){ 
    const userData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${environment.url}/signInWithPassword?key=${environment.apiKey}`, userData);
  }
*/
}
