import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect, MatInputModule } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import 'rxjs/Rx';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';
//Interfaces
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { Nivel } from '../interfaces/nivel';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { TipoReferente } from '../interfaces/tipo-referente';

//Servicios
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { ModalidadService } from '../providers/modalidad.service';
import { TipoReferenteService } from '../providers/tipo-referente.service';
import { SendService } from '../providers/send.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';

@Component({
  selector: 'app-referido-web',
  templateUrl: './referido-web.component.html',
  styleUrls: ['./referido-web.component.scss']
})
export class ReferidoWebComponent implements OnInit {

  form: FormGroup;

  campus: Campus[] = [];
  carreras: Carrera[] = [];
  modalidades: Modalidad[] = [];
  niveles: Nivel[] = [];
  tiposReferentes: TipoReferente[] = [];
  parentescos: Parentesco[] = [];
  rows = [];
  campusTxt: any;
  nivelTxt: any;

  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  user: FormControl;
  name_ref: FormControl;
  patern_ref: FormControl;
  matern_ref: FormControl;
  mail_ref: FormControl;
  tipo_ref: FormControl;
  cuenta_ref: FormControl;
  phone_ref: FormControl;

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

  constructor(private landingService: LandingService,private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2,
     private campusServ: CampusService,
    private carreraServ: CarreraService,
    private modalidadServ: ModalidadService,
    private sendServ: SendService,
    private parentescoServ: ParentescoService,
    private campusCarreraServ: CampusCarreraService,
    private tipoRefenteServ: TipoReferenteService) {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  ngOnInit() {

        this.landingService.getInit();

    // Se obtienen todos los campus
    this.campusServ.getAll()
        .subscribe(
          (data: Campus[]) => this.campus = data
        )
    // Se obtienen todas las carreras
    this.tipoRefenteServ.getAll()
      .subscribe(
        (data: TipoReferente[]) => this.tiposReferentes = data
      )
    // Se obtienen todos los parentescos
    this.parentescoServ.getAll()
    .subscribe(
        (data: Parentesco[]) => this.parentescos = data
    )

    this.formInit();
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/referidos.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  formInit() {

    this.form = new FormGroup({
      name_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      patern_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      matern_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      mail_ref: new FormControl('', [LandingValidation.emailMaloValidator()]),
      tipo_ref: new FormControl(''),
      phone_ref: new FormControl(''),
      cuenta_ref: new FormControl(''),

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
    if (this.form.valid) {

      // -------------------------------- Predictivo  ----------------------------------

      const predTel = this.form.value.Telefono.substring(0,2);
      this.form.value.Banner = window.location.href;

      if(this.form.value.tipoCel == "Celular"){
        if(predTel == 55){
          this.form.value.TelefonoCelularPredictivo = '9044'+this.form.value.Telefono;
        }else{
          this.form.value.TelefonoCelularPredictivo = '9045'+this.form.value.Telefono;
        }
      }

      if(this.form.value.tipoCel == "Casa"){
        if(predTel == 55){
          this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
        }else{
          this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono;
        }
      }

      for(let i=0;i < this.rows.length; i++){
        if(this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == "C1"){
          this.form.value.Team = this.rows[i].TEAM;
          this.form.value.Prioridad = this.rows[i].PRIORIDAD;
          this.form.value.Attemp = this.rows[i].ATTEMP;
        }
      }
      // -------------------------------- Predictivo  ----------------------------------

      this.sendServ.sendDataToApi(this.form.value)
        .subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.showDialog("Los datos se han guardado correctamente.");
              this.resetForm();
            } else {
              this.showDialog("Error al realizar el registro.");
              this.resetForm();
            }
          }
        )
    } else {
      this.showDialog("Error al realizar el registro *");
    }

  }

  resetForm() {
    window.location.href = "/referidoWeb";

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
    for(let i=0;i < this.campus.length; i++){
      if(this.campus[i].crmit_tb_campusid == value){
        this.campusTxt = this.campus[i].crmi_name;
      }
    }

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
    this.niveles = this.campusCarreraServ.getNivelesByCarrera(value);
  }

onChangeNivel(value: string){
  for(let i=0;i < this.niveles.length; i++){
    if(this.niveles[i].crmit_codigounico == value){
      this.nivelTxt = this.niveles[i].crmit_name;
    }
  }
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
    this.modalidades = this.campusCarreraServ.getModalidadesByNivel(value);
}

onChangeModalidad(value: string){
    if(this.form.controls['Carrera'].disabled){
        this.form.controls['Carrera'].enable();
    }else{
        this.form.controls['Carrera'].setValue('');
        this.form.controls['Carrera'].markAsUntouched();
    }
    this.carreras = this.campusCarreraServ.getCarrerasByModalidad(value);
}

 private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: {message: message}
        });
       dialogRef.afterClosed().subscribe(result => {
         window.location.href = "/referidoWeb";
       });
  }

  private showDialogE(message: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '180px',
      width: '500px',
      data: { message: message }
    });
  }

}