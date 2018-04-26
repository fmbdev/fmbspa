import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';
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
import { NivelService } from '../providers/nivel.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { SendService } from '../providers/send.service';
@Component({
  selector: 'app-referido-promotor',
  templateUrl: './referido-promotor.component.html',
  styleUrls: ['./referido-promotor.component.scss']
})


export class ReferidoPromotorComponent implements OnInit {

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


  constructor(private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2,
    private campusServ: CampusService,
    private carreraServ: CarreraService,
    private nivelServ: NivelService,
     private sendServ: SendService,
    private modalidadServ: ModalidadService) { }

  ngOnInit() {
     // Se obtienen todos los campus
        this.campusServ.getAll()
            .subscribe(
                (data: Campus[]) => this.campus = data
            )
        // Se obtienen todos los niveles
        this.nivelServ.getAll()
            .subscribe(
                (data: Nivel[]) => this.niveles = data
            )
        // Se obtienen todas las modalidades
        this.modalidadServ.getAll()
            .subscribe(
                (data: Modalidad[]) => this.modalidades = data
            )
        // Se obtienen todas las carreras
        this.carreraServ.getAll()
            .subscribe(
                (data: Carrera[]) => this.carreras = data
            )
    this.formInit();
  }

  formInit() {

    this.form = new FormGroup({
      Usuario: new FormControl({ value: '', disabled: true }, Validators.required),

      Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
      cel: new FormControl('', [Validators.minLength(10)]),
      Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
      extension: new FormControl(''),
      tipoCel: new FormControl(''),



      Campus: new FormControl(''),
      Nivel: new FormControl(''),
      Modalidad: new FormControl(''),
      Carrera: new FormControl(''),
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
    window.location.href = "/registerPromotion";
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

   private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: {message: message}
        });
      }

}
