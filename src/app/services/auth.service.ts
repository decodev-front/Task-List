import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User { uid:string, name?:string };


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuariosCollection: AngularFirestoreCollection<User>

  usuarios: Observable<User[]>

  guardar: boolean;

  public usuario: User;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
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

                // this.guardarUsuario( this.usuario );
                console.log(this.guardar);

                if( this.guardar ){
                  this.guardarUsuario( this.usuario );
                }

                this.router.navigate(['home', this.usuario.uid])

              })
    
    this.usuariosCollection = afs.collection<User>('Usuarios')          
    this.usuarios = this.usuariosCollection.valueChanges();

  } 

  private guardarUsuario(user: User) {

      this.usuariosCollection.doc(user.uid).set({
        name: user.name
      })
      .then((response)=>{
        console.log( response )
      })
      .catch((error) => console.error(error))
  }


  login() {
    this.auth.signInWithPopup( new auth.GoogleAuthProvider() )
              .then((response)=>{

                this.guardar = response.additionalUserInfo.isNewUser;
              });
  }

  logout() {
    return this.auth.signOut();
  }
}
