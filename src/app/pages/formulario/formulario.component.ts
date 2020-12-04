import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {


  formulario: FormGroup;
  usuarioNuevo: UserModel;

  constructor(private router: Router, private user: UserService, private fbuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
  }

  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }
  get mailNoValido() {
    return this.formulario.get('mail').invalid && this.formulario.get('mail').touched;
  }
  get passwordNoValida() {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }
  get tipoUserNoValido() {
    return this.formulario.get('tipoUser').invalid && this.formulario.get('tipoUser').touched;
  }
  crearFormulario() {

    this.formulario = this.fbuilder.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required, Validators.minLength(5) ] ],
      mail  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password   : ['', [Validators.required, Validators.minLength(4) ]],
      tipoUser   : ['', [Validators.required, Validators.minLength(5) ]]
    });
  }
  guardar(){
    this.usuarioNuevo = {
      nombre: this.formulario.get('nombre').value,
      apellido: this.formulario.get('apellido').value,
      mail: this.formulario.get('mail').value,
      password: this.formulario.get('password').value,
      tipoUSer: this.formulario.get('tipoUser').value
    };
    // ahora hay que mandar el usuario a firebase o donde sea que lo guardemos
  }

  ngOnInit(): void {
  }

}
