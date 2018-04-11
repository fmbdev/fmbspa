import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import 'rxjs/Rx';

import { LandingValidation } from '../validations/landing.validations';

import { Csq } from '../interfaces/csq';
//import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
//import { Ciclo } from '../interfaces/ciclo';
//import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Asesor } from '../interfaces/asesor';
//import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
//import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
//import { HoraService } from '../providers/hora.service';
import { NivelService } from '../providers/nivel.service';
import { CanalService } from '../providers/canal.service';
//import { CicloService } from '../providers/ciclo.service';
//import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { GeneroService } from '../providers/genero.service';
//import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
//import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
//import { CampusCitaService } from '../providers/campus-cita.service';
import { TipificacionService } from '../providers/tipificacion.service';


@Component({
  selector: 'app-referido-web',
  templateUrl: './referido-web.component.html',
  styleUrls: ['./referido-web.component.scss']
})
export class ReferidoWebComponent implements OnInit {
  form: FormGroup;

  /*csqs: Csq[] = [];
  horas: Hora[] = [];
  ciclos: Ciclo[] = [];
  niveles: Nivel[] = [];
  canales: Canal[] = [];
  campus: Campus[] = [];
  generos: Genero[] = [];
  asesores: Asesor[] = [];
  carreras: Carrera[] = [];
  modalidades: Modalidad[] = [];
  campus_citas: CampusCita[] = [];
  parentescos: Parentesco[] = [];
  tipificaciones: Tipificacion[] = [];*/

  intereses: Interes[] = [];
  



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
  public mostrarExtension: boolean = null;

  constructor(private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2,
    private pnnServ: PnnService,
    private csqServ: CsqService,
    //private horaServ: HoraService,
    private sendServ: SendService,
    private nivelServ: NivelService,
    //private cicloServ: CicloService,
    private canalServ: CanalService,
    //private campusServ: CampusService,
    private asesorServ: AsesorService,
    private generoServ: GeneroService,
    //private carreraServ: CarreraService,
    private interesServ: InteresService,
    //private modalidadServ: ModalidadService,
    private parentescoServ: ParentescoService,
    //private campusCitaServ: CampusCitaService,
    private tipicicacionServ: TipificacionService) { }

  ngOnInit() {
     
    // Se obtienen todos los intereses
    this.interesServ.getAll()
      .subscribe(
        (data: Interes[]) => this.intereses = data
      )
    // Se obtienen todos los parentescos
 
 
    this.formInit();
  }

  formInit() {

    this.form = new FormGroup({
      name_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      patern_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      matern_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      mail_ref: new FormControl('', [LandingValidation.emailMaloValidator()]),
      tipo_ref: new FormControl('', [Validators.minLength(10)]),
      phone_ref: new FormControl(''),
      cuenta_ref: new FormControl(''),


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
