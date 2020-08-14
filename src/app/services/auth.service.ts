import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any = {}

  constructor(
    public auth: AngularFireAuth
  ) { 

    this.auth.authState
              .subscribe( (user) => {

                console.log("Estado del User", user);

                if( !user ){
                  return;
                }

                this.usuario.uid = user.uid;
                this.usuario.name = user.displayName;

                console.log( this.usuario )

              })

  }

  login() {
    return this.auth.signInWithPopup( new auth.GoogleAuthProvider() );
  }

  logout() {
    return this.auth.signOut();
  }

}
