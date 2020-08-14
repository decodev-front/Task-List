import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  logeado = false;

  constructor(
    private _authService: AuthService,
    private router : Router
  ) { 
    this._authService.auth.authState
                    .subscribe( (user) => {
                      if( !user ){
                        this.logeado = false
                        return;
                      } else {
                        this.logeado = true
                        this.router.navigate(['home', user.displayName.toLowerCase()])
                      }
                    }) 
     console.log(this.logeado);               
  }

  ngOnInit(): void {
  }


  login() {
    this._authService.login()
        .then((response)=> {
          console.log( response );
          this.logeado = true;
          this.router.navigate(['home', response.user.displayName.toLowerCase()])
        })
        .catch((error) => {
          console.error( "Error al autenticarse", error );
        })
  }


  logout() {
    this._authService.logout()
        .then((response)=> {
          response;
          this.logeado = false;
          this.router.navigate(['login']);
        })
        .catch((error)=> {
          console.error( "Error al salir", error );
        } )
  }



}
