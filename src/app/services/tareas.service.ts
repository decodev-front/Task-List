import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Interface } from 'readline';
import { TareaModel } from '../models/tarea.models';
import { Observable } from 'rxjs';
import { AuthService, User } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareasUsuarioCollection: AngularFirestoreCollection<TareaModel>;

  tareas: Observable<TareaModel[]>;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private _authService: AuthService
  ) { 

    this.auth.user
            .subscribe( (response) => {
              let pathUser = 'Usuarios/'+response.uid+'/Tareas';

              this.cargarColeccion( pathUser );

            })


           
    
  }


  cargarColeccion( pathUser: string ) {

    this.tareasUsuarioCollection = this.afs.collection<TareaModel>(pathUser);

    this.tareas = this.tareasUsuarioCollection.valueChanges();

    this.tareas.subscribe( (response) => {
      console.log( response );
    })
  }





}
