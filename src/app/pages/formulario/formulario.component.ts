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

  get nameInvalid() {
    return this.formulario.get('name').invalid && this.formulario.get('name').touched;
  }

  get surnameInvalid() {
    return this.formulario.get('surname').invalid && this.formulario.get('surname').touched;
  }
  get mailInvalid() {
    return this.formulario.get('mail').invalid && this.formulario.get('mail').touched;
  }
  get passwordInvalid() {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }
  get userTypeInvalid() {
    return this.formulario.get('userType').invalid && this.formulario.get('userType').touched;
  }
  /**
   * Establecemos los requisitos minimos par validar cada campo
   * En el correo he añadido una expesión regular para validarlo
   */
  crearFormulario() {

    this.formulario = this.fbuilder.group({
      name  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      surname: ['', [Validators.required, Validators.minLength(5) ] ],
      mail  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password   : ['', [Validators.required, Validators.minLength(4) ]],
      userType   : ['', [Validators.required, Validators.minLength(5) ]]
    });
  }
  /**
   * Recuperamos cada uno de los valores del formulario y creamos el objeto usuario
   * 
   */
  guardar(){
    this.usuarioNuevo = {
      name: this.formulario.get('name').value,
      surname: this.formulario.get('surname').value,
      mail: this.formulario.get('mail').value,
      password: this.formulario.get('password').value,
      userType: this.formulario.get('userType').value
    };
    // ahora hay que mandar el usuario a firebase o donde sea que lo guardemos
  }

  ngOnInit(): void {
  }

}
