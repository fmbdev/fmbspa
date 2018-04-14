import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';

import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Turno } from '../interfaces/turno';
import { Campus } from '../interfaces/campus';
import { Asesor } from '../interfaces/asesor';
import { Genero } from '../interfaces/genero';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { TipoActividad } from '../interfaces/tipo-actividad';
import { SubTipoActividad} from '../interfaces/sub-tipo-actividad';

import { NivelService } from '../providers/nivel.service';
import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { TurnoService } from '../providers/turno.service';
import { GeneroService } from '../providers/genero.service';
import { AsesorService } from '../providers/asesor.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
import { TipoActividadService } from '../providers/tipo-actividad.service';
import { SubTipoActividadService } from '../providers/sub-tipo-actividad.service';

@Component({
  selector: 'app-new-register-promotion',
  templateUrl: './new-register-promotion.component.html',
  styleUrls: ['./new-register-promotion.component.scss']
})

export class NewRegisterPromotionComponent implements OnInit { 
 
  form: FormGroup;
  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  user: FormControl;
  ejecutivo: FormControl;
  actvidadNoTradicional: FormControl;
  subTipoActividad: FormControl;
  company: FormControl;
  SubSubTipoActividad: FormControl;
  turno: FormControl;
  school: FormControl;
  calidad: FormControl;


  name: FormControl;
  patern: FormControl;
  matern: FormControl;
  mail: FormControl;
  cel: FormControl;
  phone: FormControl;
  gender: FormControl;
  FechaNacimiento: FormControl;
  Edad: FormControl;


  nameRegis: FormControl;
  paternRegis: FormControl;
  maternRegis: FormControl;
  mailRegis: FormControl;
  celRegis: FormControl;
  phoneRegis: FormControl;
  parentRegis: FormControl;


  Campus:FormControl;
    AreaInteres:FormControl;
    Nivel:FormControl;
    Modalidad:FormControl;
    Carrera:FormControl;
    Ciclo:FormControl;
  numPersona: FormControl;
  etapaVenta: FormControl;
  numCuenta: FormControl;

  tipificacion: FormControl;
  notas: FormControl;


  citaFecha: FormControl;
  citaCampus: FormControl;
  citaHora: FormControl;
  citaCall: FormControl;
  citaTransfer: FormControl;
  citaAsesor: FormControl;

  ciclos: Ciclo[] = [];
  turnos: Turno[] = [];
  niveles: Nivel[] = [];
  campus: Campus[] = [];
  generos: Genero[] = [];
  asesores: Asesor[] = [];
  carreras: Carrera[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  parentescos: Parentesco[] = [];
  tipo_actividades: TipoActividad[] = [];
  sub_tipo_actividades: SubTipoActividad[] = [];


  constructor(private gralService: GeneralService, 
              public dialog: MatDialog,  
              private renderer: Renderer2,
              private turnoServ: TurnoService,
              private nivelServ: NivelService,
              private cicloServ: CicloService,
              private asesorServ: AsesorService,
              private campusServ: CampusService,
              private generoServ: GeneroService,
              private carreraServ: CarreraService,
              private interesServ: InteresService,
              private modalidadServ: ModalidadService,
              private parentescoServ: ParentescoService,
              private tipoActServ: TipoActividadService,
              private subTipoActServ: SubTipoActividadService) { }

  ngOnInit() {
    // Se obtiene los tipos de actividades
    this.tipoActServ.getAll()
        .subscribe(
          (data: TipoActividad[]) => this.tipo_actividades = data
        )
    // Se obtienen los sub tipos de actividades
    this.subTipoActServ.getAll()
        .subscribe(
          (data: SubTipoActividad[]) => this.sub_tipo_actividades = data
        )
    // Se obtienen los turnos
    this.turnoServ.getAll()
        .subscribe(
          (data: Turno[]) => this.turnos = data
        )
    // Se obtienen todos los intereses
    this.interesServ.getAll()
        .subscribe(
            (data: Interes[]) => this.intereses = data
        )
    // Se obtienen todos los generos
    this.generoServ.getAll()
        .subscribe(
            (data: Genero[]) => this.generos = data
        )
    // Se obtienen todos los parentescos
    this.parentescoServ.getAll()
        .subscribe(
            (data: Parentesco[]) => this.parentescos = data
        )
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
    // Se obtienen los ciclos
    this.cicloServ.getAll()
        .subscribe(
            (data: Ciclo[]) => this.ciclos = data
        )
        // Se obtienen todos los intereses
    this.interesServ.getAll()
        .subscribe(
            (data: Interes[]) => this.intereses = data
        )

    this.formInit();
  }

  formInit() {
    this.form = new FormGroup({
      user: new FormControl({ value: '', disabled: true }, Validators.required),
      ejecutivo: new FormControl(''),

      
      actvidadNoTradicional: new FormControl(''),
      subTipoActividad: new FormControl(''),
      company: new FormControl(''),
      SubSubTipoActividad: new FormControl(''),
      turno: new FormControl(''),
      school: new FormControl(''),
      calidad: new FormControl(''),

      name: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      patern: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      matern: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      mail: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
      cel: new FormControl('', [ Validators.minLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      gender: new FormControl(''),
      FechaNacimiento: new FormControl(''),
      Edad: new FormControl('', [Validators.minLength(2)]),

      paternRegis: new FormControl(''),
      nameRegis: new FormControl(''),
      maternRegis: new FormControl(''),
      mailRegis: new FormControl(''),
      celRegis: new FormControl(''),
      phoneRegis: new FormControl(''),
      parentRegis: new FormControl(''),

      Campus: new FormControl(''),
            AreaInteres: new FormControl(''),
            Nivel: new FormControl(''),
            Modalidad: new FormControl(''),
            Carrera: new FormControl(''),
            Ciclo: new FormControl(''),
      numPersona: new FormControl(''),
      etapaVenta: new FormControl('', ),
      numCuenta: new FormControl('', ),

      tipificacion: new FormControl('', Validators.required),
      notas: new FormControl(''),

      citaCampus: new FormControl({ value: '', disabled: true }, Validators.required),
      citaFecha: new FormControl({ value: '', disabled: true }, Validators.required),
      citaHora: new FormControl({ value: '', disabled: true }, Validators.required),
      citaCall: new FormControl({ value: '', disabled: true }, Validators.required),
      citaTransfer: new FormControl({ value: '', disabled: true }, Validators.required),
      citaAsesor: new FormControl({ value: '', disabled: true }, Validators.required)

    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  resetForm() {
    this.form.reset();
  }
  onKeyFechaNacimiento() {
    let edad = this.form.controls.Edad.value;
    let year = new Date().getFullYear();
    let fechaNac = year - edad;
    let fecha = '1/1/' + fechaNac;
    this.form.controls.FechaNacimiento.setValue(fecha);
  }
  onKeydownEmail(event: KeyboardEvent) {
    let name = this.form.controls.nameRegis.value;
    if (name == '') {
      this.form.controls.nameRegis.clearValidators();
      this.form.controls.paternRegis.clearValidators();
      this.form.controls.maternRegis.clearValidators();
      this.form.controls.mailRegis.clearValidators();
      this.form.controls.celRegis.clearValidators();
      this.form.controls.phoneRegis.clearValidators();
      this.form.controls.parentRegis.clearValidators();
    } else {

      this.form.controls.nameRegis.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
      this.form.controls.paternRegis.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
      this.form.controls.maternRegis.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
      this.form.controls.mailRegis.setValidators([Validators.required, LandingValidation.emailMaloValidator()]);
      this.form.controls.celRegis.setValidators([Validators.required, Validators.minLength(10)]);
      this.form.controls.phoneRegis.setValidators([Validators.required, Validators.minLength(10)]);
      this.form.controls.parentRegis.setValidators([Validators.required]);
    }
    this.form.controls.nameRegis.updateValueAndValidity();
    this.form.controls.paternRegis.updateValueAndValidity();
    this.form.controls.maternRegis.updateValueAndValidity();
    this.form.controls.mailRegis.updateValueAndValidity();
    this.form.controls.celRegis.updateValueAndValidity();
    this.form.controls.phoneRegis.updateValueAndValidity();
    this.form.controls.parentRegis.updateValueAndValidity();
  }
  onChangeInteres(value){
        if(value==''){
        
            this.form.controls.Campus.clearValidators();
            this.form.controls.AreaInteres.clearValidators();
            this.form.controls.Nivel.clearValidators();
            this.form.controls.Modalidad.clearValidators();
            this.form.controls.Carrera.clearValidators();
            this.form.controls.Ciclo.clearValidators();
        
        }else{

             this.form.controls.Campus.setValidators([Validators.required]);
             this.form.controls.AreaInteres.setValidators([Validators.required]);
             this.form.controls.Nivel.setValidators([Validators.required]);
             this.form.controls.Modalidad.setValidators([Validators.required]);
             this.form.controls.Carrera.setValidators([Validators.required]);
             this.form.controls.Ciclo.setValidators([Validators.required]); 
        }
             this.form.controls.Campus.updateValueAndValidity();
             this.form.controls.AreaInteres.updateValueAndValidity();
             this.form.controls.Nivel.updateValueAndValidity();
             this.form.controls.Modalidad.updateValueAndValidity();
             this.form.controls.Carrera.updateValueAndValidity();
             this.form.controls.Ciclo.updateValueAndValidity();
        
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
    if (this.form.controls.name.value != '' && this.form.controls.patern.value != '' && this.form.controls.matern.value != '' && this.form.controls.mail.value != '' && this.form.controls.cel.value != '' && this.form.controls.phone.value != '') {
      this.form.controls.citaCampus.reset({ value: '', disabled: false });
      this.form.controls.citaFecha.reset({ value: '', disabled: false });
      this.form.controls.citaHora.reset({ value: '', disabled: false });
      this.form.controls.citaCall.reset({ value: '', disabled: false });
      this.form.controls.citaTransfer.reset({ value: '', disabled: false });
      this.form.controls.citaAsesor.reset({ value: '', disabled: false });
    } else {
      this.form.controls.citaCampus.reset({ value: '', disabled: true });
      this.form.controls.citaFecha.reset({ value: '', disabled: true });
      this.form.controls.citaHora.reset({ value: '', disabled: true });
      this.form.controls.citaCall.reset({ value: '', disabled: true });
      this.form.controls.citaTransfer.reset({ value: '', disabled: true });
      this.form.controls.citaAsesor.reset({ value: '', disabled: true });
    }
  }

  addValidation(isChecked) {
    if (isChecked.checked) {
      this.form.controls.mail.reset({ value: '', disabled: true });
    } else {
      this.form.controls.mail.reset({ value: '', disabled: false });
    }
    this.form.controls.mail.updateValueAndValidity();
  }


}
