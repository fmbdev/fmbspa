import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';

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

      Nombre: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
      ApellidoPaterno: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
      ApellidoMaterno: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
      CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
      cel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      Telefono: new FormControl('', [Validators.required, Validators.minLength(10)]),
      extension: new FormControl(''),
      tipoCel: new FormControl(''),



      Campus: new FormControl('', Validators.required),
      //interestArea: new FormControl('', Validators.required),
      Nivel: new FormControl('', Validators.required),
      Modalidad: new FormControl('', Validators.required),
      Carrera: new FormControl('', Validators.required),
      Ciclo: new FormControl('', Validators.required),
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

}
