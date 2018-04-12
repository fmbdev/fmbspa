import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Asesor } from '../interfaces/asesor';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service'; 
import { HoraService } from '../providers/hora.service';
import { NivelService } from '../providers/nivel.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { TipificacionService } from '../providers/tipificacion.service';


@Component({
  selector: 'app-new-register-existing',
  templateUrl: './new-register-existing.component.html',
  styleUrls: ['./new-register-existing.component.scss']
})
export class NewRegisterExistingComponent implements OnInit {

    form: FormGroup;
    //maxDate = new Date(2018, this.month.getMonth(),12);
    maxDate = LandingValidation.fechaLimite();
    startDate = LandingValidation.fechaInicio();

    user: FormControl;
    canal: FormControl;
    csq: FormControl;
    interes: FormControl;
    phone_email: FormControl;


    name: FormControl;
    patern: FormControl;
    matern: FormControl;
    mail: FormControl;
    cel: FormControl;
    phone: FormControl;
    gender: FormControl;
    birthday: FormControl;
    edad: FormControl;


    nameRegis: FormControl;
    paternRegis: FormControl;
    maternRegis: FormControl;
    mailRegis: FormControl;
    celRegis: FormControl;
    phoneRegis: FormControl;
    parentRegis: FormControl;


    interestCampus: FormControl;
    interestArea: FormControl;
    interestNivel: FormControl;
    interestModalidad: FormControl;
    interestCarrera: FormControl;
    interestCiclo: FormControl;
    numPersona:FormControl;
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

    csqs: Csq[] = [];
    horas: Hora[] = [];
    ciclos: Ciclo[] = [];
    niveles: Nivel[] = [];
    canales: Canal[] = [];
    campus: Campus[] = [];
    generos: Genero[] = [];
    asesores: Asesor[] = [];
    carreras: Carrera[] = [];
    intereses: Interes[] = [];
    modalidades: Modalidad[] = [];
    campus_citas: CampusCita[] = [];
    parentescos: Parentesco[] = [];
    tipificaciones: Tipificacion[] = [];

    constructor(private gralService: GeneralService, 
                public dialog: MatDialog, 
                private renderer: Renderer2,
                private csqServ: CsqService,
                private horaServ: HoraService,
                private nivelServ: NivelService,
                private cicloServ: CicloService,
                private canalServ: CanalService,
                private campusServ: CampusService,
                private asesorServ: AsesorService,
                private generoServ: GeneroService,
                private carreraServ: CarreraService,
                private interesServ: InteresService,
                private modalidadServ: ModalidadService,
                private parentescoServ: ParentescoService,
                private campusCitaServ: CampusCitaService,
                private tipicicacionServ: TipificacionService) { }

    ngOnInit() {
        // Se obtiene todos los canales
        this.canalServ.getAll()
            .subscribe(
                (data: Canal[]) => this.canales = data
            )
        // Se obtienen todos los csqs
        this.csqServ.getAll()
            .subscribe(
                (data: Csq[]) => this.csqs = data
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
        // Se obtienen todas las tipificaciones
        this.tipicicacionServ.getAll()
            .subscribe(
                (data: Tipificacion[]) => this.tipificaciones = data
            )
        // Se obtienen todos los campus-cita
        this.campusCitaServ.getAll()
            .subscribe(
                (data: CampusCita[]) => this.campus_citas = data
            )
        // Se obtienen todas las hora para asignar una cita
        this.horaServ.getAll()
            .subscribe(
                (data: Hora[]) => this.horas = data
            )
        // Se obtienen todos lo asesores
        this.asesorServ.getAll()
            .subscribe(
                (data: Asesor[]) => this.asesores = data   
            )
        
        this.formInit();
    }

    formInit() {
        this.form = new FormGroup({
            user: new FormControl({ value: '', disabled: true }, Validators.required),
            canal: new FormControl('', Validators.required),
            csq: new FormControl('', Validators.required),
            interes: new FormControl('', Validators.required),
            phone_email: new FormControl('', Validators.required),

            name: new FormControl('', [ LandingValidation.palabraMalaValidator()]),
            patern: new FormControl('', [ LandingValidation.palabraMalaValidator()]),
            matern: new FormControl('', [ LandingValidation.palabraMalaValidator()]),
            mail: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
            cel: new FormControl('', [ Validators.minLength(10)]),
            phone: new FormControl('', [ Validators.minLength(10)]),
            gender: new FormControl(''),
            birthday: new FormControl(''),
            edad: new FormControl('', Validators.minLength(2)),

            paternRegis: new FormControl(''),
            nameRegis: new FormControl(''),
            maternRegis: new FormControl(''),
            mailRegis: new FormControl(''),
            celRegis: new FormControl(''),
            phoneRegis: new FormControl(''),
            parentRegis: new FormControl(''),

            interestCampus: new FormControl('', Validators.required),
            interestArea: new FormControl('', Validators.required),
            interestNivel: new FormControl('', Validators.required),
            interestModalidad: new FormControl('', Validators.required),
            interestCarrera: new FormControl('', Validators.required),
            interestCiclo: new FormControl('', Validators.required),
            numPersona: new FormControl(''),
            etapaVenta: new FormControl('',),
            numCuenta: new FormControl('',),

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
