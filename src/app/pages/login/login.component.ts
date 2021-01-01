import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { ValidadoresService } from 'src/app/services/validadores.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correctAccess: boolean;
  form: FormGroup;
  usuario: UserModel;


  constructor(private router: Router, private user: UserService, private fbuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get mailNoValido() {
    return this.form.get('mail').invalid && this.form.get('mail').touched;
  }
  get passwordNoValida() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }
  crearFormulario() {

    this.form = this.fbuilder.group({
      mail  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password   : ['', [Validators.required, Validators.minLength(4) ]]
    });
  }
  /*
  login(mail: string, password: string){
    this.usuario = {mail, password};
    this.user.login(this.usuario).subscribe( respuesta => {
      console.log(respuesta);
      this.router.navigateByUrl('/home');
    });
  }
  */
  login(mail: string, password: string){ // pasamos el user por el servicio para comprobar si el login es correcto.
    this.correctAccess = this.user.login('jaime', 'catalan', mail, password, 'admin');
    if (this.correctAccess === true){
      this.router.navigateByUrl('/home');
    }
  }

  acceder() {
    console.log( this.form );
    if ( this.form.invalid ) {
      return Object.values( this.form.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.login(this.form.get('mail').value, this.form.get('password').value); // recupero los datos del formulario
    this.form.reset();
  }

}
