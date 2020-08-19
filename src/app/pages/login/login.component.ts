import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {   
    this._authService.usuario = this.user;
  }

  ngOnInit(): void {
  }


  login() {

    this._authService.login();
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
