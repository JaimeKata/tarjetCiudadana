import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../../../build/classes/app/services/validadores.service';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.css']
})
export class FormEventoComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fbuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
  }
  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get aforoNoValido() {
    return this.formulario.get('aforo').invalid && this.formulario.get('aforo').touched;
  }
  get descripcionNoValida() {
    return this.formulario.get('descripcion').invalid && this.formulario.get('descripcion').touched;
  }
  get fechaInicioNoValida() {
    return this.formulario.get('fechaInicio').invalid && this.formulario.get('fechaInicio').touched;
  }
  get fechaFinNoValida() {
    return this.formulario.get('fechaFin').invalid && this.formulario.get('fechaFin').touched;
  }
  get codigoPostalNoValido() {
    return this.formulario.get('direccion.codigoPostal').invalid && this.formulario.get('direccion.codigoPostal').touched;
  }
/*/
  get ciudadNoValido() {
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched;
  }
/*/
  crearFormulario() {

    this.formulario = this.fbuilder.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      aforo  : ['', [ Validators.required ]  ],
      descripcion : ['', [ Validators.required ]  ],
      fechaInicio  : ['', [ Validators.required ]  ],
      fechaFin  : ['', [ Validators.required ]  ],
      direccion: this.fbuilder.group({
        codigoPostal: ['', Validators.required ],
        ciudad  : ['', Validators.required ],
      })
    });
  }
  guardar(){

  }

  ngOnInit(): void {
  }

}
