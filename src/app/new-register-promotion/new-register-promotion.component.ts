import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import * as $ from 'jquery';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Turno } from '../interfaces/turno';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Asesor } from '../interfaces/asesor';
import { Carrera } from '../interfaces/carrera';
import { SubTipo } from '../interfaces/sub-tipo';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { TurnoService } from '../providers/turno.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { FormatService } from '../providers/format.service';
import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { TipificacionService } from '../providers/tipificacion.service';
import { TipoActividadService } from '../providers/tipo-actividad.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';
import { SubsubtipoActividadService } from '../providers/subsubtipo-actividad.service';


@Component({
    selector: 'app-new-register-promotion',
    templateUrl: './new-register-promotion.component.html',
    styleUrls: ['./new-register-promotion.component.scss']
})

export class NewRegisterPromotionComponent implements OnInit {

    form: FormGroup;
    sinEmail = false;
    //maxDate = new Date(2018, this.month.getMonth(),12);
    maxDate = LandingValidation.fechaLimite();
    startDate = LandingValidation.fechaInicio();
    Usuario: FormControl;
    //Asesor: FormControl;
    SinCorreo: FormControl;

    actvidadNoTradicional: FormControl;

    ActividadAgenda: FormControl;
    SubTipoActividad: FormControl;
    SubSubTipoActividad: FormControl;
    EscuelaEmpresa: FormControl;
    Turno: FormControl;
    Calidad: FormControl;

    Nombre: FormControl;
    ApellidoPaterno: FormControl;
    ApellidoMaterno: FormControl;
    CorreoElectronico: FormControl;
    NumeroCelular: FormControl;
    Telefono: FormControl;
    Genero: FormControl;
    FechaNacimiento: FormControl;
    Edad: FormControl;

    NombreTutor: FormControl;
    ApellidoPaternoTutor: FormControl;
    ApellidoMaternoTutor: FormControl;
    CorreoElectronicoTutor: FormControl;
    NumeroCelularTutor: FormControl;
    TelefonoTutor: FormControl;
    ParentescoTutor: FormControl;

    Campus: FormControl;
    AreaInteres: FormControl;
    Nivel: FormControl;
    Modalidad: FormControl;
    Carrera: FormControl;
    Ciclo: FormControl;
    Tipificacion: FormControl;
    Notas: FormControl;

    NumeroPersona: FormControl;
    etapaVenta: FormControl;
    NumeroCuenta: FormControl;

    csqs: Csq[] = [];
    horas: Hora[] = [];
    ciclos: Ciclo[] = [];
    turnos: Turno[] = [];
    niveles: Nivel[] = [];
    canales: Canal[] = [];
    campus: Campus[] = [];
    generos: Genero[] = [];
    asesores: Asesor[] = [];
    sub_tipos: SubTipo[] = [];
    carreras: Carrera[] = [];
    subtipos: SubTipo[] = [];
    intereses: Interes[] = [];
    modalidades: Modalidad[] = [];
    subsub_tipos: SubsubTipo[] = [];
    campus_citas: CampusCita[] = [];
    parentescos: Parentesco[] = [];
    tipificaciones: Tipificacion[] = [];
    escuelas_empresas: EscuelaEmpresa[] = [];

    constructor(private landingService: LandingService,
        private gralService: GeneralService,
        public dialog: MatDialog,
        private renderer: Renderer2,
        private csqServ: CsqService,
        private pnnServ: PnnService,
        private horaServ: HoraService,
        private sendServ: SendService,
        private cicloServ: CicloService,
        private turnoServ: TurnoService,
        private canalServ: CanalService,
        private campusServ: CampusService,
        private asesorServ: AsesorService,
        private formatServ: FormatService,
        private generoServ: GeneroService,
        private carreraServ: CarreraService,
        private interesServ: InteresService,
        private modalidadServ: ModalidadService,
        private parentescoServ: ParentescoService,
        private tipoActServ: TipoActividadService,
        private campusCitaServ: CampusCitaService,
        private campusCarreraServ: CampusCarreraService,
        private tipicicacionServ: TipificacionService,
        private subSubServ: SubsubtipoActividadService,
        private escuelaEmpresaServ: EscuelaEmpresaService) { }


    ngOnInit() {
        this.landingService.getInit();

        // Se obtienes los Subtipos de actividades
        this.sub_tipos = this.subSubServ.getAllSubTipo();

        // Se obtienes los Subsubtipos de actividades
        this.subsub_tipos = this.subSubServ.getAllSubSubTipo();
        
        // Se obtienen los turnos
        this.turnoServ.getAll()
            .subscribe(
                (data: Turno[]) => this.turnos = data
            )
        // Se obtiene todos los canales
        this.canalServ.getAll()
            .subscribe(
                (data: Canal[]) => this.canales = data
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
        //Se obtienen todas las esculas empresas
        this.escuelaEmpresaServ.getAll()
            .subscribe(
                (data: EscuelaEmpresa[]) => this.escuelas_empresas = data
        )

        this.formInit();
    }

    formInit() {
        let userLocal = localStorage.getItem('user');
        let datos = JSON.parse(userLocal);
        
        this.form = new FormGroup({


            Usuario: new FormControl({ value: datos.fullname, disabled: false }, Validators.required),
            //Asesor: new FormControl(''),

            actvidadNoTradicional: new FormControl(''),

            ActividadAgenda: new FormControl(''),
            SubTipoActividad: new FormControl(''),
            SubSubTipoActividad: new FormControl({ value: '', disabled: true }),
            EscuelaEmpresa: new FormControl(''),
            Turno: new FormControl(''),
            Calidad: new FormControl('', [Validators.required, Validators.maxLength(5)]),
            SinCorreo:new FormControl(''),

            Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
            NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Genero: new FormControl(''),
            FechaNacimiento: new FormControl(''),
            Edad: new FormControl('', [Validators.minLength(2)]),

            NombreTutor: new FormControl(''),
            ApellidoPaternoTutor: new FormControl(''),
            ApellidoMaternoTutor: new FormControl(''),
            CorreoElectronicoTutor: new FormControl(''),
            NumeroCelularTutor: new FormControl(''),
            TelefonoTutor: new FormControl(''),
            ParentescoTutor: new FormControl(''),

            Campus: new FormControl(''),
            AreaInteres: new FormControl(''),
            Nivel: new FormControl({ value: '', disabled: true }),
            Modalidad: new FormControl({ value: '', disabled: true }),
            Carrera: new FormControl({ value: '', disabled: true }),
            Ciclo: new FormControl(''),
            NumeroPersona: new FormControl('', Validators.pattern('^[0-9]+$')),
            etapaVenta: new FormControl(''),
            NumeroCuenta: new FormControl('', Validators.pattern('^[0-9]+$')),

            Tipificacion: new FormControl(''),
            Notas: new FormControl(''),

        });
    }

    onSubmit() {
        
        let form = this.form;
        let pnnServ = this.pnnServ;

        $('form').find(':input').each(function(){
            if($(this).hasClass('validPhoneNumber')){
                let name = $(this).attr('formControlName');
                if(form.controls[name].value != '' && form.controls[name].value != null){
                    if(!pnnServ.checkPnnIsValid(form.controls[name].value)){
                        form.controls[name].setErrors({'numInvalid': true});
                    }else{
                        form.controls[name].setErrors({'numInvalid': false});
                        form.controls[name].updateValueAndValidity();
                    }
                }else{
                    form.controls[name].setErrors({'numInvalid': false});
                    form.controls[name].reset();
                }
            }
        })

        this.onKeyFechaNacimiento();

        if (this.form.valid) {

            if (this.sinEmail) {
                let tel = this.form.controls['Telefono'].value;
                this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
            }

          // -------------------------------- Predictivo  ----------------------------------

            const predTel = this.form.value.Telefono.substring(0,2);
            
            if (this.form.value.NumeroCelular){
                const predCel = this.form.value.NumeroCelular.substring(0, 2);
                this.form.value.TelefonoCelularPredictivo = '9045' + this.form.value.NumeroCelular;
                if (predCel == 55) {
                    this.form.value.TelefonoCelularPredictivo = '9044' + this.form.value.NumeroCelular;
                }
            }
            if (this.form.value.NumeroCelularTutor) {
                const predCelTutor = this.form.value.NumeroCelularTutor.substring(0, 2);
                this.form.value.TelefonoCelularPredictivoTutor = '9045' + this.form.value.NumeroCelularTutor;
                
                if (predCelTutor == 55) {
                    this.form.value.TelefonoCelularPredictivoTutor = '9044' + this.form.value.NumeroCelularTutor;
                }
            }

            if (this.form.value.TelefonoTutor) {
                const predTelTutor = this.form.value.TelefonoTutor.substring(0, 2);
                this.form.value.TelefonoPredictivoTutor = '901' + this.form.value.TelefonoTutor;
                
                if (predTelTutor == 55) {
                    this.form.value.TelefonoPredictivoTutor = '9' + this.form.value.TelefonoTutor;
                }
            }


           this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono;
          this.form.value.Banner = window.location.href;

          

           

          if(predTel == 55){
            this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
          }
            let edadT = this.form.value.Edad;
            if(edadT==""){
                edadT = 12;
            }
            const sendd = {
                Usuario: this.form.value.Usuario,
                Nombre: this.form.value.Nombre, 
                ApellidoPaterno: this.form.value.ApellidoPaterno, 
                ApellidoMaterno: this.form.value.ApellidoMaterno, 
                CorreoElectronico: this.form.value.CorreoElectronico, 
                NumeroCelular: this.form.value.NumeroCelular, 
                Telefono: this.form.value.Telefono, 
                Genero: 1, 
                //Genero: this.form.value.Genero, 
                Edad: edadT, SinCorreo: this.form.value.SinCorreo,
                NombreTutor: this.form.value.NombreTutor, 
                ApellidoPaternoTutor: this.form.value.ApellidoPaternoTutor, 
                NumeroCelularTutor: this.form.value.NumeroCelularTutor, 
                ApellidoMaternoTutor: this.form.value.ApellidoMaternoTutor, 
                CorreoElectronicoTutor: this.form.value.CorreoElectronicoTutor, 
                TelefonoTutor: this.form.value.TelefonoTutor,
                Campus: this.form.value.Campus, 
                AreaInteres: this.form.value.AreaInteres, 
                Ciclo: this.form.value.Ciclo, 
                Carrera: this.form.value.Carrera, 
                Nivel: this.form.value.Nivel, 
                Modalidad: this.form.value.Modalidad,
                Banner: this.form.value.Banner
            };
           /*
              CampusCita: this.form.value.CampusCita,
               FechaCita: this.form.value.FechaCita,
               HoraCita: this.form.value.HoraCita,
               Programacion: this.form.value.Programacion,
               Asesor: this.form.value.Asesor,

                 TelefonoCelularPredictivo: this.form.value.TelefonoCelularPredictivo,
                 TelefonoCelularPredictivoTutor: this.form.value.TelefonoCelularPredictivoTutor,
                 TelefonoPredictivo: this.form.value.TelefonoPredictivo,
                 TelefonoPredictivoTutor: this.form.value.TelefonoPredictivoTutor, 
                 CanalPreferido: this.form.value.CanalPreferido, 
                 Team: this.form.value.Team, 
                 Prioridad: this.form.value.Prioridad, 
                 Attemp: this.form.value.Attemp
            */
          // -------------------------------- Predictivo  ----------------------------------

            this.sendServ.sendDataToApi(sendd)
                .subscribe(
                    (res: any) => {
                        if (res.status == 200) {

                            this.showDialog("Los datos se han guardado correctamente.");

                        } else {

                            this.showDialogE("Error al realizar el registro.");
                        }
                    }
                )
        } else {
            this.showDialogE("Error al realizar el registro *");
        }

    }

    resetForm() {
        window.location.href = "/registerPromotion";
        this.form.reset();
    }

    onKeyFechaNacimiento() {
        let edad = this.form.controls.Edad.value;
        let year = new Date().getFullYear();
        let fecha = year - edad;
        this.form.controls.FechaNacimiento.setValue('01/01/'+fecha);
    }

    onKeydownEmail(event: KeyboardEvent) {
        let name = this.form.controls.NombreTutor.value;
        if (name == '') {
            this.form.controls.NombreTutor.clearValidators();
            this.form.controls.ApellidoPaternoTutor.clearValidators();
            this.form.controls.ApellidoMaternoTutor.clearValidators();
            this.form.controls.CorreoElectronicoTutor.clearValidators();
            this.form.controls.NumeroCelularTutor.clearValidators();
            this.form.controls.TelefonoTutor.clearValidators();
            this.form.controls.ParentescoTutor.clearValidators();
        } else {

            this.form.controls.NombreTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
            this.form.controls.ApellidoPaternoTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
            this.form.controls.ApellidoMaternoTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
            this.form.controls.CorreoElectronicoTutor.setValidators([Validators.required, LandingValidation.emailMaloValidator()]);
            this.form.controls.NumeroCelularTutor.setValidators([Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            this.form.controls.TelefonoTutor.setValidators([Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            this.form.controls.ParentescoTutor.setValidators([Validators.required]);
        }
        this.form.controls.NombreTutor.updateValueAndValidity();
        this.form.controls.ApellidoPaternoTutor.updateValueAndValidity();
        this.form.controls.ApellidoMaternoTutor.updateValueAndValidity();
        this.form.controls.CorreoElectronicoTutor.updateValueAndValidity();
        this.form.controls.NumeroCelularTutor.updateValueAndValidity();
        this.form.controls.TelefonoTutor.updateValueAndValidity();
        this.form.controls.ParentescoTutor.updateValueAndValidity();
    }

    _keyOnly3letter(event: any, name: any) {
        LandingValidation.letterName(event, name);
    }

    _keyPress(event: any) {
        LandingValidation.onlyNumber(event);
    }

    _keyPressNumA(event: any, name: any) {
        LandingValidation.onlyNumberIgual(event, name);
    }
    _keyPressTxt(event: any) {
        LandingValidation.onlyLetter(event);
    }

    _keyPressNum(event: any, value: any, word: any) {
        if (value == 1) {
            LandingValidation.onlyNumber(event);
            LandingValidation.limitChar(event, word);
            LandingValidation.onlyNumberIgual(event, word);
        }
    }

    onChange() {}

    addTradicional(isChecked) {
        if (isChecked.checked) {
            this.form.controls.EscuelaEmpresa.reset({ value: '', disabled: true });
            this.form.controls.Turno.reset({ value: '', disabled: true });
            this.form.controls.Calidad.reset({ value: '', disabled: true });
        } else {
            this.form.controls.EscuelaEmpresa.reset({ value: '', disabled: false });
            this.form.controls.Turno.reset({ value: '', disabled: false });
            this.form.controls.Calidad.reset({ value: '', disabled: false });
        }
        this.form.controls.EscuelaEmpresa.updateValueAndValidity();
        this.form.controls.Turno.updateValueAndValidity();
        this.form.controls.Calidad.updateValueAndValidity();
    }


    onChangeInteres(value) {
        if (value == '') {
            this.form.controls.Campus.clearValidators();
            this.form.controls.AreaInteres.clearValidators();
            this.form.controls.Nivel.clearValidators();
            this.form.controls.Modalidad.clearValidators();
            this.form.controls.Carrera.clearValidators();
            this.form.controls.Ciclo.clearValidators();
        } else {
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
        this.niveles = this.campusCarreraServ.getNivelesByCarrera(value);
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

    onChangeSubTipo(value: string){
        if(this.form.controls['SubSubTipoActividad'].disabled){
            this.form.controls['SubSubTipoActividad'].enable();
        }else{
            this.form.controls['SubSubTipoActividad'].setValue('');
            this.form.controls['SubSubTipoActividad'].markAsUntouched();
        }
        this.subsub_tipos = this.subSubServ.getSubSubTiposBySubTipo(value);
    }

    onFielCanal(value) {
        this.form.controls.TelefonoCorreo.clearValidators();
        this.form.controls.TelefonoCorreo.reset({ value: '', disabled: false });
        if (value == 1) {
            this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10), Validators.maxLength(10), LandingValidation.aceptNumberValidator()]);
        } else {
            this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
        }
        this.form.controls.TelefonoCorreo.updateValueAndValidity();
    }

    addValidation(isChecked) {
        if (isChecked.checked) {
            this.form.controls.CorreoElectronico.reset({ value: 'telefono@unitec.edu.mx', disabled: false });
            this.sinEmail = true;

        } else {
            this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
            this.sinEmail = false;
        }
        this.form.controls.CorreoElectronico.updateValueAndValidity();
    }

    addAsesor(isChecked) {

    }

    showMjs(field: any) {
        return LandingValidation.getMensaje(field);
    }

    private showDialog(message: string) {
        let dialogRef = this.dialog.open(DialogComponent, {
            height: '180px',
            width: '500px',
            data: { message: message }
        });
        dialogRef.afterClosed().subscribe(result => {
            window.location.href = "/registerPromotion";
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
