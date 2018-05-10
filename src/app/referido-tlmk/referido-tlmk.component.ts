import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';
//Interfaces
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { Nivel } from '../interfaces/nivel';
import { Modalidad } from '../interfaces/modalidad';

//Servicios
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { SendService } from '../providers/send.service';
import { CampusNivelService } from '../providers/campus-nivel.service';

@Component({
  selector: 'app-referido-tlmk',
  templateUrl: './referido-tlmk.component.html',
  styleUrls: ['./referido-tlmk.component.scss']
})
export class ReferidoTlmkComponent implements OnInit {

  form: FormGroup;

  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  Usuario: FormControl;

  Nombre: FormControl;
  ApellidoPaterno: FormControl;
  ApellidoMaterno: FormControl;
  CorreoElectronico: FormControl;
  cel: FormControl;
  Telefono: FormControl;
  extension: FormControl;
  tipoCel: FormControl;

  Campus: FormControl;
  //interestArea: FormControl;
  Nivel: FormControl;
  Modalidad: FormControl;
  Carrera: FormControl;
  Ciclo: FormControl;
  tipificacion: FormControl;
  public mostrarExtension: boolean = null;

  campus: Campus[] = [];
  carreras: Carrera[] = [];
  modalidades: Modalidad[] = [];
  niveles: Nivel[] = [];

  constructor(private landingService: LandingService,private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2,
    private campusServ: CampusService,
    private carreraServ: CarreraService,
    private sendServ: SendService,
    private modalidadServ: ModalidadService,
    private campusNivelServ: CampusNivelService,) { }

  ngOnInit() {
    
    this.landingService.getInit();    
    
    // Se obtienen todos los campus
    this.campusServ.getAll()
      .subscribe(
        (data: Campus[]) => this.campus = data
      )
    // Se obtienen todos los niveles
    this.niveles = this.modalidadServ.getNiveles();

    // Se obtienen todas las modalidades
    this.modalidades = this.modalidadServ.getModalidades();

    // Se obtienen todas las carreras
    this.carreraServ.getAll()
      .subscribe(
        (data: Carrera[]) => this.carreras = data
      )
    this.formInit();
  }

  formInit() {
    let userLocal = localStorage.getItem('user');
        let datos = JSON.parse(userLocal);
    this.form = new FormGroup({
      Usuario: new FormControl({ value: datos.fullname, disabled: true }, Validators.required),

      Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
      cel: new FormControl('', [Validators.minLength(10)]),
      Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
      extension: new FormControl(''),
      tipoCel: new FormControl(''),

      Campus: new FormControl(''),
      Nivel: new FormControl({ value: '', disabled: true }),
      Modalidad: new FormControl({ value: '', disabled: true }),
      Carrera: new FormControl({ value: '', disabled: true }),
      Ciclo: new FormControl(''),
      tipificacion: new FormControl(''),
    });
  }

  onSubmit() {
    this.mostrarExtension = true;
   this.sendServ.sendDataToApi(this.form.value)
         .subscribe(
              (res: any) => {
                  if(res.status == 200){
                     this.showDialog("Los datos se han guardado correctamente.");
                     this.resetForm();
                  }else{
                     this.showDialog("Error al realizar el registro.");
                     this.resetForm();
                  }
              }
        )
  }

  resetForm() {
    window.location.href = "/referidoTlmk";
    
    this.form.reset();
  }
  onChangeInteres(value) {
    if (value == '') {
      this.form.controls.Campus.clearValidators();
      this.form.controls.Nivel.clearValidators();
      this.form.controls.Modalidad.clearValidators();
      this.form.controls.Carrera.clearValidators();

    } else {

      this.form.controls.Campus.setValidators([Validators.required]);
      this.form.controls.Nivel.setValidators([Validators.required]);
      this.form.controls.Modalidad.setValidators([Validators.required]);
      this.form.controls.Carrera.setValidators([Validators.required]);
    }
    this.form.controls.Campus.updateValueAndValidity();
    this.form.controls.Nivel.updateValueAndValidity();
    this.form.controls.Modalidad.updateValueAndValidity();
    this.form.controls.Carrera.updateValueAndValidity();

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
  showMjs(field: any) {
    return LandingValidation.getMensaje(field);
  }
  _keyPressNum(event: any, value: any, word: any) {
    if (value == 1) {
      LandingValidation.onlyNumber(event);
      LandingValidation.limitChar(event, word);
      LandingValidation.onlyNumberIgual(event, word);
    }
  }
  _keyPressNumA(event: any, name: any) {
    LandingValidation.onlyNumberIgual(event, name);
  }
  onChange() {
    if (this.form.controls.tipoCel.value == 'Oficina') {
      this.mostrarExtension = false;
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

  onChangeCampus(value: string){
    if(this.form.controls['Nivel'].disabled){
        this.form.controls['Nivel'].enable();
    }else{
        this.form.controls['Nivel'].setValue('');
        this.form.controls['Nivel'].markAsUntouched();
    }

    if(this.form.controls['Modalidad'].enabled){
        this.form.controls['Modalidad'].setValue('');
        this.form.controls['Modalidad'].markAsUntouched();
        this.form.controls['Modalidad'].disable();      
    }

    if(this.form.controls['Carrera'].enabled){
        this.form.controls['Carrera'].setValue('');
        this.form.controls['Carrera'].markAsUntouched();
        this.form.controls['Carrera'].disable();      
    }
    this.niveles = this.campusNivelServ.getNivelesByCampus(value);
}

onChangeNivel(value: string){
    if(this.form.controls['Modalidad'].disabled){
        this.form.controls['Modalidad'].enable();
    }else{
        this.form.controls['Modalidad'].setValue('');
        this.form.controls['Modalidad'].markAsUntouched();
    }

    if(this.form.controls['Carrera'].enabled){
        this.form.controls['Carrera'].setValue('');
        this.form.controls['Carrera'].markAsUntouched();
        this.form.controls['Carrera'].disable();      
    }
    this.modalidades = this.campusNivelServ.getModalidadByNivel(value);   
}

onChangeModalidad(value: string){
    if(this.form.controls['Carrera'].disabled){
        this.form.controls['Carrera'].enable();
    }else{
        this.form.controls['Carrera'].setValue('');
        this.form.controls['Carrera'].markAsUntouched();
    }
    this.carreras = this.campusNivelServ.getCarreraByModalidad(value);
}

 private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: {message: message}
        });
      }

}
