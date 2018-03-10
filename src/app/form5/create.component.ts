import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, FormGroupDirective, NgForm} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'form5 -create',//contact-create
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})




export class Form5Component {

  canales = [{value: '', viewValue: 'Canal'}, {value: 'Voz', viewValue: 'Voz'}, {value: 'Chat', viewValue: 'Chat'}, {value: 'WA', viewValue: 'WA'}, ];
  csqs = [{value: '', viewValue: 'Csq'}, {value: 'Val1', viewValue: 'Val1'}, {value: 'Val2', viewValue: 'Val2'}, ];
  campus = [{value: '', viewValue: 'Campus'}, {value: 'Atizapan', viewValue: 'Atizapan'}, {value: 'Cuitlahuac', viewValue: 'Cuitlahuac'}, {value: 'Ecatepec', viewValue: 'Ecatepec'}, ];
  niveles = [{value: 'Bachillerato', viewValue: 'Bachillerato'}, {value: 'Licenciatura', viewValue: 'Licenciatura'}, {value: 'Posgrado', viewValue: 'Posgrado'}, ];
  modalidades = [{value: 'Presencial', viewValue: 'Presencial'}, {value: 'En línea', viewValue: 'En línea'}, {value: 'Mixta', viewValue: 'Mixta'}, ];
  programa = [{value: '', viewValue: 'Programa'}, {value: 'Prepa SEP', viewValue: 'Prepa SEP'}, {value: 'Arquitectura', viewValue: 'Arquitectura'}, {value: 'Diseño', viewValue: 'Diseño'}, {value: 'Gastronomía ', viewValue: 'Gastronomía'}, {value: 'Mercadotecnia ', viewValue: 'Mercadotecnia'}, ];
  ciclos = [{value: '', viewValue: 'Ciclo'}, {value: '18-2', viewValue: '18-2'}, {value: '18-3', viewValue: '18-3'}, {value: '19-1', viewValue: '19-1'}, ];
  sexos = [{value: '', viewValue: 'Sexo'}, {value: 'Hombre', viewValue: 'Hombre'}, {value: 'Mujer', viewValue: 'Mujer'} ];
  interes = [{value: '', viewValue: 'Interés'}, {value: 'Interesa', viewValue: 'Interesa'}, {value: 'No interesa', viewValue: 'No interesa'} ];
  parentescos = [{value: 'Papa', viewValue: 'Papa'}, {value: 'Mama', viewValue: 'Mama'}, {value: 'Abuelo(a)', viewValue: 'Abuelo(a)'}, {value: 'Tutor', viewValue: 'Tutor'}, {value: 'Hermano(a)', viewValue: 'Hermano(a)'} ];
  hora = [{value: '', viewValue: 'Hora'}, {value: '9am', viewValue: '9am'}, {value: '10am', viewValue: '10am'}, {value: '11am', viewValue: '11am'}, {value: '12pm', viewValue: '12pm'}, {value: '1pm', viewValue: '1pm'}, {value: '2pm', viewValue: '2pm'}, ];
  asesor = [{value: '', viewValue: 'Asesor'}, {value: 'Juan Lopez', viewValue: 'Juan Lopez'}, {value: 'Javier guerrero', viewValue: 'Javier guerrero'}, ];

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email2FormControl = new FormControl('', [Validators.required, Validators.email]);

  canalFormControl = new FormControl('', [Validators.required]);
  csqFormControl  = new FormControl('', [Validators.required]);
  tipificacionFormControl  = new FormControl('', [Validators.required]);
  interesFormControl  = new FormControl('', [Validators.required]);
  
  nombreFormControl  = new FormControl('', [Validators.required]);
  referenteFormControl  = new FormControl('', [Validators.required]);
  apellidoPaternoFormControl = new FormControl('',[Validators.required]);
  apellidoMaternoFormControl = new FormControl('',[Validators.required]);
  TelefonoFormControl = new FormControl('',[Validators.required]);


  matcher = new MyErrorStateMatcher();

  constructor() {}
 
  ngOnInit() {}

  onFormSubmit(){}

}