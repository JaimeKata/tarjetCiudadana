import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoModel } from 'src/app/models/event.model';
import { UserModel } from 'src/app/models/user.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class BBDDService {

  private eventDoc: AngularFirestoreCollection<EventoModel>;
  event: AngularFirestoreDocument<EventoModel>;

  constructor(private dbService: AngularFirestore, private http: HttpClient) { 

  }
  /**
   * Comprobamos la capacidad del evento
   * 
   */
  checkCapacity(){
    //coleccion de evento
    //recuperamos el evento por id
    var docRef = this.dbService.collection(environment.collectionId).doc(environment.eventId);

    docRef.get().subscribe(function(doc) {
    if (doc.exists) {
      const event: EventoModel = doc.data();
        console.log("Evento:", event);
        docRef.update({capacity: event.capacity -1 })
    } else {
        // doc.data() will be undefined in this case
        console.log('No se ha encontrado el evento');
      }
    });
  }

  getCapacity(): Observable<any>{
    var docRef = this.dbService.collection(environment.collectionId).doc(environment.eventId);
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
