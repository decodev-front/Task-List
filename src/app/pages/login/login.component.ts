import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(
    private _authService: AuthService
  ) {   
    this._authService.usuario = this.user;
  }

  ngOnInit(): void {
  }


  login() {
    this._authService.login()
        .then((response)=> {
          console.log( response );
        })
        .catch((error) => {
          console.error( "Error al autenticarse", error );
        })
  }


  logout() {
    this._authService.logout()
        .then((response)=> {
          response;
        })
        .catch((error)=> {
          console.error( "Error al salir", error );
        } )
  }



}
