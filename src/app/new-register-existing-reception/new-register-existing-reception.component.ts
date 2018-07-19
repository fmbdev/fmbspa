import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import 'rxjs/Rx';

import * as $ from 'jquery';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

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
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
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
import { TipificacionService } from '../providers/tipificacion.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';

@Component({
  selector: 'app-new-register-existing-reception',
  templateUrl: './new-register-existing-reception.component.html',
  styleUrls: ['./new-register-existing-reception.component.scss']
})

export class NewRegisterExistingReceptionComponent implements OnInit {

    form: FormGroup;
    sinEmail = false;
    conEmail = true;

    //maxDate = new Date(2018, this.month.getMonth(),12);
    maxDate = LandingValidation.fechaLimite();
    startDate = LandingValidation.fechaInicio();

    Usuario: FormControl;
    Canal: FormControl;
    CSQ: FormControl;
    TelefonoCorreo: FormControl;
    Interesa_NoInteresa: FormControl;

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
    NumeroCelularR: FormControl;
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


    CampusCitas: FormControl;
    FechaCita: FormControl;
    HoraCita: FormControl;
    Programacion: FormControl;
    Transferencia: FormControl;
    Asesor: FormControl;

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
    rows = [];
    campusTxt: any;
    nivelTxt: any;
      canalText: any;


    constructor(private landingService: LandingService,
        private gralService: GeneralService,
        public dialog: MatDialog,
        private renderer: Renderer2,
        private pnnServ: PnnService,
        private csqServ: CsqService,
        private horaServ: HoraService,
        private sendServ: SendService,
        private cicloServ: CicloService,
        private canalServ: CanalService,
        private campusServ: CampusService,
        private asesorServ: AsesorService,
        private formatServ: FormatService,
        private generoServ: GeneroService,
        private carreraServ: CarreraService,
        private interesServ: InteresService,
        private modalidadServ: ModalidadService,
        private parentescoServ: ParentescoService,
        private campusCitaServ: CampusCitaService,
        private campusCarreraServ: CampusCarreraService,
        private tipicicacionServ: TipificacionService) { 
    this.fetch((data) => {
        this.rows = data;
      });
}

    fetch(cb) {
    const req = new XMLHttpRequest();
        req.open('GET', `assets/inbound.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
    ngOnInit() {

        this.landingService.getInit();

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
            NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Genero: new FormControl(''),
            FechaNacimiento: new FormControl(''),
            Edad: new FormControl('', [Validators.minLength(2),LandingValidation.edadMinValidator()]),


            NombreTutor: new FormControl(''),
            ApellidoPaternoTutor: new FormControl(''),
            ApellidoMaternoTutor: new FormControl(''),
            CorreoElectronicoTutor: new FormControl(''),
            NumeroCelularR: new FormControl(''),
            TelefonoTutor: new FormControl(''),
            ParentescoTutor: new FormControl(''),

            Campus: new FormControl(''),
            AreaInteres: new FormControl(''),
            Nivel: new FormControl({ value: '', disabled: true }),
            Modalidad: new FormControl({ value: '', disabled: true }),
            Carrera: new FormControl({ value: '', disabled: true }),
            Ciclo: new FormControl(''),
            NumeroPersona: new FormControl('12345678', Validators.pattern('^[0-9]+$')),
            etapaVenta: new FormControl('Registro'),
            NumeroCuenta: new FormControl('12345678', Validators.pattern('^[0-9]+$')),

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
        });

        if (this.sinEmail) {
            this.form.controls.CorreoElectronico.clearValidators();
            console.log("ClearValidation email");
        } else {
            if (this.form.controls['CorreoElectronico'].value != "") {
                this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
                this.form.controls.Telefono.clearValidators();
                this.form.controls.Telefono.updateValueAndValidity();
            } else {
                console.log('aqui');
                let tel = this.form.controls['Telefono'].value;
                if (tel) {
                    this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                    this.form.controls.CorreoElectronico.clearValidators();
                    this.form.controls.CorreoElectronico.updateValueAndValidity();
                    this.conEmail = false;
                }

            }
        }

        if (this.form.controls['CorreoElectronico'].value != "" && this.form.controls['Telefono'].value == "") {
            console.log('aqui 123');
            this.form.controls.Telefono.updateValueAndValidity();
            this.form.controls.Telefono.clearValidators();
        }


        if (this.form.valid) {
            
            if (this.sinEmail) {
                let tel = this.form.controls['Telefono'].value;
                this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                this.conEmail = false;
            }


          // -------------------------------- Predictivo  ----------------------------------
            
            const predTel = this.form.value.Telefono.substring(0,2);
            if(predTel == 55){
              this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
            }
            this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono; 


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
         

          if(this.form.value.Canal == 'Chat' || this.form.value.Canal == 'WhatsApp' || this.form.value.Canal == 'SMS'){
            this.form.value.CanalPreferido = 'Redes Sociales';
          }


            let _Ciclo = (this.form.value.Ciclo == null) ? "" : this.form.value.Ciclo;
            let CicloV = _Ciclo.split('*');
            let ciclo = "";
            let nombre_ventas = "";


            this.form.value.Banner = window.location.href;
            this.form.value.FuenteObtencion = null;

            console.log("Ciclo del form: " + CicloV);
            console.log(" " );
            console.log(" " );console.log(" " );
            console.log(" " );console.log(" " );
            //En caso de ser 18-3, esos son los resultados y ubicacion de var
            console.log('CicloV[0] : '+CicloV[0]); //id
            console.log('CicloV[1] : '+CicloV[1]); //18-3
            console.log('CicloV[2] : '+CicloV[2]); //true
            console.log('CicloV[3] : '+CicloV[3]); //Mayo
            console.log('CicloV[4] : '+CicloV[4]); //C2
           

            let f_negocio = "";
            for (let i = 0; i < this.rows.length; i++) {
                
                nombre_ventas = (CicloV[4] == "") ? "C3" : CicloV[4];

                if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == nombre_ventas) {
                    this.form.value.Team = this.rows[i].TEAM;
                    this.form.value.Prioridad = this.rows[i].PRIORIDAD;
                    this.form.value.Attemp = this.rows[i].ATTEMP;
                    this.form.value.FuenteObtencion = this.rows[i].FUENTE_NEGOCIO;
                    f_negocio = this.rows[i].FUENTE_NEGOCIO;

                }

            }

            ciclo = CicloV[1];

          // -------------------------------- Predictivo  ----------------------------------
            let edadT = this.form.value.Edad;

            if(edadT==""){
                edadT = 12;
            }

            /* Interes GUID */
            let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
            let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel; 
            let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad; 
            let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera; 
            let _Interes =( this.form.value.AreaInteres==null)? "": this.form.value.AreaInteres; 
            
            let CampusV = _Campus.split('*');
            let NivelV = _Nivel.split('*');
            let ModalidadV = _Modalidad.split('*');
            let CarreraV = _Carrera.split('*');
            let InteresV = _Interes.split('*');

            const sendd = {
              Usuario: this.form.value.Usuario,
              Canal: this.form.value.Canal, 
              CSQ: this.form.value.CSQ, 
              TelefonoCorreo: this.form.value.TelefonoCorreo, 
              Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa)? "" :this.form.value.Interesa_NoInteresa,

              Nombre: this.form.value.Nombre, 
              ApellidoPaterno: this.form.value.ApellidoPaterno, 
              ApellidoMaterno: this.form.value.ApellidoMaterno, 
              CorreoElectronico: this.form.value.CorreoElectronico, 
              Genero: (this.form.value.Genero=='')? -1 : this.form.value.Genero,
              Edad: edadT, 

              NombreTutor: this.form.value.NombreTutor, 
              ApellidoPaternoTutor: this.form.value.ApellidoPaternoTutor, 
              ApellidoMaternoTutor: this.form.value.ApellidoMaternoTutor, 
              CorreoElectronicoTutor: this.form.value.CorreoElectronicoTutor, 

              FuenteNegocio : (f_negocio == "")? "" : f_negocio,
                Campus: CampusV[1],
                Nivel: NivelV[1],
                Modalidad: ModalidadV[1],
                Carrera: CarreraV[1],
               
                AreaInteres: InteresV[1],
                Ciclo: ciclo,
                
                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                
                GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                GUIDUsuario:localStorage.getItem('UserId'),

                Banner: this.form.value.Banner,
                Tipificacion: this.form.value.Tipificacion,
                Notas: this.form.value.Notas,

                Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
                Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                FuenteObtencion: this.form.value.FuenteObtencion,
                
                //Numero Celular
                Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
                TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                //Numero Telefono o Telefono Casa
                TelefonoCasa: this.form.value.Telefono,
                TelefonoCasaPredictivo:this.form.value.TelefonoPredictivo,
              

                //Numero Celular Tutor
                NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
                TelefonoCelularTutorPredictivo:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                //Numero Casa Tutor                
                TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,


            };

            console.log("this.conEmail");
            console.log(this.conEmail);
            if (this.conEmail) {
                this.sendServ.sendData4(sendd)// this.form.value)
                    .subscribe(
                        (res: any) => {
                            console.log(res.status);
                            if (res.status == 200) {
                                this.showDialogE("Registro guardado con éxito.");
                                this.sendServ.sendData6(sendd)// this.form.value)
                                    .subscribe(
                                        (res: any) => {
                                            console.log(res.status);
                                            if (res.status == 200) {
                                                this.showDialog("Los datos se han guardado correctamente.");
                                            } else {
                                                this.showDialogE("Error al guardar el registro.");
                                            }
                                        }
                                    )

                            } else {
                                this.showDialogE("Error al guardar el registro.");
                            }
                        }, error => {
                            if (error.status === 400) {
                                console.log(error);
                                this.showDialogE(error._body);
                            }
                            else if (error.status === 500) {
                                this.showDialogE(error._body);
                            }
                        }
                    )
            } else {
                this.sendServ.sendData5(sendd)// this.form.value)
                    .subscribe(
                        (res: any) => {
                            console.log(res.status);
                            if (res.status == 200) {
                                this.showDialogE("Registro guardado con éxito.");
                                this.sendServ.sendData6(sendd)// this.form.value)
                                    .subscribe(
                                        (res: any) => {
                                            console.log(res.status);
                                            if (res.status == 200) {
                                                this.showDialog("Los datos se han guardado correctamente.");
                                            } else {
                                                this.showDialogE("Error al guardar el registro.2");
                                            }
                                        }
                                    )

                            } else {
                                this.showDialogE("Error al guardar el registro.");
                            }
                        }, error => {
                            if (error.status === 400) {
                                console.log(error);
                                this.showDialogE(error._body);
                            }
                            else if (error.status === 500) {
                                this.showDialogE(error._body);
                            }
                        }
                    )
            }

        } else {
            this.showDialogE("Error al realizar el registro *");
        }
    }

    resetForm() {
        window.location.href = "/register-existing-reception";        
        //this.form.reset();
    }

    onKeyFechaNacimiento() {
        let edad = this.form.controls.Edad.value;
        let year = new Date().getFullYear();
        let fecha = year - edad;
        this.form.controls.FechaNacimiento.setValue(fecha);
    }

    onKeydownEmail(event: KeyboardEvent) {
        let name = this.form.controls.NombreTutor.value;
        if (name == '') {
            this.form.controls.NombreTutor.clearValidators();
            this.form.controls.ApellidoPaternoTutor.clearValidators();
            this.form.controls.ApellidoMaternoTutor.clearValidators();
            this.form.controls.CorreoElectronicoTutor.clearValidators();
            this.form.controls.NumeroCelularR.clearValidators();
            this.form.controls.TelefonoTutor.clearValidators();
            this.form.controls.ParentescoTutor.clearValidators();
        } else {

            this.form.controls.NombreTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
            this.form.controls.ApellidoPaternoTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
            this.form.controls.ApellidoMaternoTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
            this.form.controls.CorreoElectronicoTutor.setValidators([Validators.required, LandingValidation.emailMaloValidator()]);
            this.form.controls.NumeroCelularR.setValidators([Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            this.form.controls.TelefonoTutor.setValidators([Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            this.form.controls.ParentescoTutor.setValidators([Validators.required]);
        }
        this.form.controls.NombreTutor.updateValueAndValidity();
        this.form.controls.ApellidoPaternoTutor.updateValueAndValidity();
        this.form.controls.ApellidoMaternoTutor.updateValueAndValidity();
        this.form.controls.CorreoElectronicoTutor.updateValueAndValidity();
        this.form.controls.NumeroCelularR.updateValueAndValidity();
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
    onChange() {
       
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

    //Cambiado
    onChangeCampus(campus: string) {
        console.log(campus);
        let cadena = campus.split('*');
        let value = cadena[0];
        for (let i = 0; i < this.campus.length; i++) {
            if (this.campus[i].crmit_tb_campusid == value) {
                this.campusTxt = this.campus[i].crmi_name;
            }
        }

        if (this.form.controls['Nivel'].disabled) {
            this.form.controls['Nivel'].enable();
        } else {
            this.form.controls['Nivel'].setValue('');
            this.form.controls['Nivel'].markAsUntouched();
        }

        if (this.form.controls['Modalidad'].enabled) {
            this.form.controls['Modalidad'].setValue('');
            this.form.controls['Modalidad'].markAsUntouched();
            this.form.controls['Modalidad'].disable();
        }

        if (this.form.controls['Carrera'].enabled) {
            this.form.controls['Carrera'].setValue('');
            this.form.controls['Carrera'].markAsUntouched();
            this.form.controls['Carrera'].disable();
        }
        this.niveles = this.campusCarreraServ.getNivelesByCarrera(value);
    }
    //Cambiando
    onChangeNivel(campus: string) {
        console.log(campus);

        let cadena = campus.split('*');
        let value = cadena[0];

        for (let i = 0; i < this.niveles.length; i++) {
            if (this.niveles[i].crmit_codigounico == value) {
                this.nivelTxt = this.niveles[i].crmit_name;
            }
        }

        if (this.form.controls['Modalidad'].disabled) {
            this.form.controls['Modalidad'].enable();
        } else {
            this.form.controls['Modalidad'].setValue('');
            this.form.controls['Modalidad'].markAsUntouched();
        }

        if (this.form.controls['Carrera'].enabled) {
            this.form.controls['Carrera'].setValue('');
            this.form.controls['Carrera'].markAsUntouched();
            this.form.controls['Carrera'].disable();
        }

        this.modalidades = this.campusCarreraServ.getModalidadesByNivel(value);
    }
    //Cambiando
    onChangeModalidad(campus: string) {

        console.log(campus);

        let cadena = campus.split('*');
        let value = cadena[0];

        if (this.form.controls['Carrera'].disabled) {
            this.form.controls['Carrera'].enable();
        } else {
            this.form.controls['Carrera'].setValue('');
            this.form.controls['Carrera'].markAsUntouched();
        }
        this.carreras = this.campusCarreraServ.getCarrerasByModalidad(value);
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
            if (this.form.controls.Telefono.value == "") {
                isChecked.source.checked = false
                this.showDialogE("Debes ingresar un teléfono de contacto");
                return false;
            }

            this.form.controls.CorreoElectronico.reset({ value: this.form.controls.Telefono.value + '@unitec.edu.mx', disabled: false });
            this.sinEmail = true;
            this.conEmail = false;
        } else {
            this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
            this.form.controls.CorreoElectronico.setValidators([Validators.required, LandingValidation.emailMaloValidator]);
            this.sinEmail = false;
            this.conEmail = true;
        }
        this.form.controls.CorreoElectronico.updateValueAndValidity();
    }

    addAsesor(isChecked) {
        if (isChecked.checked) {
            this.form.controls.Asesor.reset({ value: '', disabled: false });
        } else {
            this.form.controls.Asesor.reset({ value: '', disabled: true });
        }
        this.form.controls.Asesor.updateValueAndValidity();
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
            window.location.href = "/register-existing-reception";
        });
    }
    private showDialogE(message: string) {
        let dialogRef = this.dialog.open(DialogComponent, {
            height: '180px',
            width: '500px',
            data: { message: message }
        });
    }

    private showDialogForm(array: any, message: string, bander: string) {
        let dialogForm = this.dialog.open(DialogFormComponent, {
            height: '180px',
            width: '500px',
            data: { message: array, title: message,bandera: bander }
        });
    }

    agruparClick(){
        /*let ases = this.asesorServ.getAll()
            .subscribe(
                (data: Asesor[]) => this.asesores = data
            );*/
                
            
        //this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita-");
    }

    agruparDClick(){
       /* let ases = this.asesorServ.getAll()
            .subscribe(
                (data: AsesorCita[]) => this.asesores = data
            );
        
        localStorage.setItem('bandera',this.form.controls.Usuario.value);
        //this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita - Alfonso Silva");*/
    }


    agruparDirectaClick(){

       /* let ases = this.asesorGrupalServ.getAll()
            .subscribe(
                (data: AsesorGrupal[]) => this.asesoresGrupal = data
            );

        this.showDialogForm(this.asesoresGrupal, "Selecciona a un Asesor", "SesionG - Alfonso Silva");*/
    }

}
