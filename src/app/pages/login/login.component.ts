import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { ValidadoresService } from '../../services/validadores.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accesoCorrecto: boolean;
  formulario: FormGroup;

 // cambiar a formulario reactivo

  constructor(private router: Router, private user: UserService, private fbuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get mailNoValido() {
    return this.formulario.get('mail').invalid && this.formulario.get('mail').touched;
  }
  get passwordNoValida() {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }
  crearFormulario() {

    this.formulario = this.fbuilder.group({
      mail  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password   : ['', [Validators.required, Validators.minLength(4) ]]
    });
  }
  login(mail: string, password: string){ // pasamos el user por el servicio para comprobar si el login es correcto.
    this.accesoCorrecto = this.user.login(mail, password);
    if (this.accesoCorrecto === true){
      this.router.navigateByUrl('/home');
    }
  }
  acceder() {
    console.log( this.formulario );
    if ( this.formulario.invalid ) {
      return Object.values( this.formulario.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.login(this.formulario.get('mail').value, this.formulario.get('password').value); // recupero los datos del formulario
    this.formulario.reset();
  }

}
