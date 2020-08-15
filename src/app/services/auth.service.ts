import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User { uid:string, name?:string };


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuariosCollection: AngularFirestoreCollection<User>
  usuarios: Observable<User[]>

  listaUser: User[] = [];


  usuario: User;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 

    this.auth.authState
              .subscribe( (user) => {

                if( !user ){
                  return;
                }

                this.usuario = {
                  uid: user.uid,
                  name: user.displayName
                }

                this.guardarUsuario( this.usuario );

              })
    
    this.usuariosCollection = afs.collection<User>('Usuarios')          
    this.usuarios = this.usuariosCollection.valueChanges();

    this.usuarios
        .subscribe((response) => this.listaUser = response );

  } 

  guardarUsuario(user: User) {

    let encontrado = false;

    this.listaUser.forEach((usuario) => {
      if( usuario.uid === user.uid ){
        encontrado = true;
      }
    })

    if( !encontrado ){
      this.usuariosCollection.add(user)
      .catch((error) => console.error(error))
    }
  }




  login() {
    return this.auth.signInWithPopup( new auth.GoogleAuthProvider() );
  }

  logout() {
    return this.auth.signOut();
  }
}
