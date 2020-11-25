import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidadoresService } from '../../services/validadores.service';
import { UserService } from '../../services/user.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  formulario: FormGroup;


  constructor(private fbuilder: FormBuilder, private validadores: ValidadoresService) { 
    this.crearFormulario();
  }

  get mailNoValido() {
    return this.formulario.get('mail').invalid && this.formulario.get('mail').touched;
  }
  crearFormulario() {
    this.formulario = this.fbuilder.group({
      mail  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ]
    });
  }

  buscar(){}

  ngOnInit(): void {
  }


}
