import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';



@Component({
  selector: 'app-referido-referente',
  templateUrl: './referido-referente.component.html',
  styleUrls: ['./referido-referente.component.scss']
})

export class ReferidoReferenteComponent implements OnInit {

  form: FormGroup;

  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  user: FormControl;
   

  name: FormControl;
  patern: FormControl;
  matern: FormControl;
  mail: FormControl;
  cel: FormControl;
  phone: FormControl;
  extension: FormControl;
  tipoCel: FormControl;
 


  interestCampus: FormControl;
  //interestArea: FormControl;
  interestNivel: FormControl;
  interestModalidad: FormControl;
  interestCarrera: FormControl;
  interestCiclo: FormControl;
  tipificacion: FormControl;
  public mostrarExtension:boolean = null;

  constructor(private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    
    this.form = new FormGroup({
      user: new FormControl({ value: '', disabled: true }, Validators.required),

      name: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
      patern: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
      matern: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
      mail: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
      cel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      extension: new FormControl(''),
      tipoCel: new FormControl(''),
     


      interestCampus: new FormControl('', Validators.required),
      //interestArea: new FormControl('', Validators.required),
      interestNivel: new FormControl('', Validators.required),
      interestModalidad: new FormControl('', Validators.required),
      interestCarrera: new FormControl('', Validators.required),
      interestCiclo: new FormControl('', Validators.required),
      tipificacion: new FormControl('', Validators.required),

    });
  }

  onSubmit() {
    this.mostrarExtension = true;
    console.log(this.form.value);
  }

  resetForm() {
    this.form.reset();
  }

  _keyOnly3letter(event: any, name: any) {
    LandingValidation.letterName(event, name);
  }

  _keyPress(event: any) {
    LandingValidation.onlyNumber(event);
  }

  _keyPressTxt(event: any) {
    LandingValidation.onlyLetter(event);
  }

  onChange() {
    if (this.form.controls.tipoCel.value == 'Oficina' ) {
      this.mostrarExtension=false;
      /*this.form.controls.citaCampus.reset({ value: '', disabled: false });
      this.form.controls.citaFecha.reset({ value: '', disabled: false });
      this.form.controls.citaHora.reset({ value: '', disabled: false });
      this.form.controls.citaCall.reset({ value: '', disabled: false });
      this.form.controls.citaTransfer.reset({ value: '', disabled: false });
      this.form.controls.citaAsesor.reset({ value: '', disabled: false });*/
    } else {
      this.mostrarExtension = true;
      
      /*this.form.controls.citaCampus.reset({ value: '', disabled: true });
      this.form.controls.citaFecha.reset({ value: '', disabled: true });
      this.form.controls.citaHora.reset({ value: '', disabled: true });
      this.form.controls.citaCall.reset({ value: '', disabled: true });
      this.form.controls.citaTransfer.reset({ value: '', disabled: true });
      this.form.controls.citaAsesor.reset({ value: '', disabled: true });*/
    }
  }
}
