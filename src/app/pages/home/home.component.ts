import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _tareaService: TareasService,
    private _authService: AuthService
  ) { 
    // this.activatedRoute.params
    //     .subscribe( (response) => {
    //       console.log( response );
    //     })
  }

  ngOnInit(): void {

    this._authService.usuarios
                    .subscribe( response => {
                      console.log(response);
                    } )


  }


  aggTarea() {

    this.router.navigateByUrl('tarea/new');

  }


}
