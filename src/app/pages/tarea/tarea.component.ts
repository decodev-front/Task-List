import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styles: []
})
export class TareaComponent implements OnInit {


  forma: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 

    this.crearFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }




  guardar() {

    console.log(this.forma);

  }


  crearFormulario() {

    this.forma = this.formBuilder.group({
      idFirebase: [''],
      titulo: [''],
      desc: ['']
    })

  }


  crearListeners() {

    this.forma.get( 'idFirebase' )
              .valueChanges.subscribe( console.log );
              


  }




}
