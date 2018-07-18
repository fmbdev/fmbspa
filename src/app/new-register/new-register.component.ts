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
import { AsesorCita } from '../interfaces/asesor-cita';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';
import { AsesorGrupal } from '../interfaces/asesor-grupal';


import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { FormatService } from '../providers/format.service';
import { CampusService } from '../providers/campus.service';
import { AsesorGrupalService } from '../providers/asesor-grupal.service';
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
    selector: 'app-new-register',
    templateUrl: './new-register.component.html',
    styleUrls: ['./new-register.component.scss']
})

export class NewRegisterComponent implements OnInit {

    form: FormGroup;
    sinEmail = false;
    conEmail = true;

    minDate = new Date(new Date().setDate(new Date().getDate()));
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
    SinCorreo: FormControl;

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

    CampusCita: FormControl;
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

    asesoresGrupal: AsesorGrupal[] = [];


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
        private asesorGrupalServ: AsesorGrupalService,
        private tipicicacionServ: TipificacionService) {
        this.fetch((data) => {
            this.rows = data;
        });
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

        //Se obtienen todos los asesores

        let ases = this.asesorServ.getAll()
            .subscribe(
                (data: Asesor[]) => this.asesores = data
            );


        //Se obtiene todas los asesores grupales    
        this.asesorGrupalServ.getAll()
            .subscribe(
                (data: AsesorGrupal[]) => this.asesoresGrupal = data
            )


        this.formInit();
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/inbound.json`);
        req.onload = () => {
            cb(JSON.parse(req.response));
        };
        req.send();
    }

    formInit() {
        localStorage.setItem('bandera', '');
        let userLocal = localStorage.getItem('user');
        let datos = JSON.parse(userLocal);
        this.form = new FormGroup({
            Usuario: new FormControl({ value: datos.fullname, disabled: false }),
            Canal: new FormControl('', Validators.required),
            CSQ: new FormControl({ value: '', disabled: true }, Validators.required),
            TelefonoCorreo: new FormControl('', Validators.required),
            Interesa_NoInteresa: new FormControl('', Validators.required),

            Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
            NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Genero: new FormControl(''),
            FechaNacimiento: new FormControl(''),
            Edad: new FormControl('', [Validators.minLength(2),LandingValidation.edadMinValidator()]),

            SinCorreo: new FormControl(''),

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

            Tipificacion: new FormControl(''),
            Notas: new FormControl(''),

            CampusCita: new FormControl({ value: '', disabled: true }),
            FechaCita: new FormControl({ value: '', disabled: true }),
            HoraCita: new FormControl({ value: '', disabled: true }),
            Programacion: new FormControl({ value: '', disabled: true }),
            Transferencia: new FormControl({ value: '', disabled: true }),
            Asesor: new FormControl({ value: '', disabled: true })
        });
    }


    

    onSubmit() {


        let form = this.form;
        let pnnServ = this.pnnServ;


        $('form').find(':input').each(function () {
            if ($(this).hasClass('validPhoneNumber')) {
                let name = $(this).attr('formControlName');
                if (form.controls[name].value != '' && form.controls[name].value != null) {
                    if (!pnnServ.checkPnnIsValid(form.controls[name].value)) {
                        form.controls[name].setErrors({ 'numInvalid': true });
                    } else {
                        form.controls[name].setErrors({ 'numInvalid': false });
                        form.controls[name].updateValueAndValidity();
                    }
                } else {
                    form.controls[name].setErrors({ 'numInvalid': false });
                    form.controls[name].reset();
                }
            }
        })

        if (this.sinEmail) {
            this.form.controls.CorreoElectronico.clearValidators();
        }
        

        if (this.sinEmail) {
            this.form.controls.CorreoElectronico.clearValidators();
        }else{
            if (this.form.controls['CorreoElectronico'].value!=""){
                this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
                this.form.controls.Telefono.clearValidators();
                this.form.controls.Telefono.updateValueAndValidity();
            }else{
                let tel = this.form.controls['Telefono'].value;
                if (tel) {
                    this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                    this.form.controls.CorreoElectronico.clearValidators();
                    this.form.controls.CorreoElectronico.updateValueAndValidity();
                    this.conEmail = false;
                }

            }
        }

        if (this.form.controls['CorreoElectronico'].value != "" && this.form.controls['Telefono'].value == "" ) {
            this.form.controls.Telefono.updateValueAndValidity();
            this.form.controls.Telefono.clearValidators();
        }


        if (this.form.valid){

            this.onKeyFechaNacimiento();

            let fecha_cita = this.formatServ.changeFormatFecha(this.form.controls['FechaCita'].value);
            
            this.form.controls['FechaCita'].setValue(fecha_cita);

            if (this.sinEmail) {
                let tel = this.form.controls['Telefono'].value;
                this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                this.conEmail = false;
            }




            // -------------------------------- Predictivo  ----------------------------------
            
            if (this.form.value.Telefono) {
                const predTel = this.form.value.Telefono.substring(0,2);
                if(predTel == 55){
                  this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
                }
                this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono; 
            }

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
          let _Ciclo = (this.form.value.Ciclo == null) ? "" : this.form.value.Ciclo;
          let CicloV = _Ciclo.split('*');
          let ciclo = "";
          let nombre_ventas = "";


          this.form.value.Banner = window.location.href;
          this.form.value.FuenteObtencion="";

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





            for (let i = 0; i < this.rows.length; i++) {
                
                nombre_ventas = (CicloV[4] == "") ? "C3" : CicloV[4];

                if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == nombre_ventas) {
                    this.form.value.Team = this.rows[i].TEAM;
                    this.form.value.Prioridad = this.rows[i].PRIORIDAD;
                    this.form.value.Attemp = this.rows[i].ATTEMP;
                    this.form.value.FuenteObtencion = this.rows[i].FUENTE_NEGOCIO;

                }

            }
            

            ciclo = CicloV[1];


          // -------------------------------- Predictivo  ----------------------------------
            this.form.value.Banner = window.location.href;
            this.form.value.CanalPreferido = 'Voz';
            if (this.form.value.Canal == 'Chat' || this.form.value.Canal == 'WhatsApp' || this.form.value.Canal == 'SMS') {
                this.form.value.CanalPreferido = 'Redes Sociales';
            }


            // -------------------------------- Predictivo  ----------------------------------
            let edadT = this.form.value.Edad;

            if (edadT == "") {
                edadT = 12;
            }

            /* Interes GUID */
            let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
            let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel; 
            let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad; 
            let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera; 
            let _Interes =( this.form.value.AreaInteres==null)? "": this.form.value.AreaInteres; 
            let _Canal = (this.form.value.Canal==null)? "": this.form.value.Canal; 
            let _Parentesco = (this.form.value.ParentescoTutor == null) ? "" : this.form.value.ParentescoTutor;

            let CampusV = _Campus.split('*');
            let NivelV = _Nivel.split('*');
            let ModalidadV = _Modalidad.split('*');
            let CarreraV = _Carrera.split('*');
            let InteresV = _Interes.split('*');
            let ParentescoV = _Parentesco.split('*');
            
            
            let CanalV = _Canal.split('*');


            console.log("TelefonoCorreo desde Form: "+this.form.value.TelefonoCorreo);
            /**********Funcion para validar si contiene Telefono o correo************/ 

            //function validar_TelefonoCorreo(num) {
                if (isNaN(this.form.value.TelefonoCorreo)) {
                    //Aqui asignamos Correo
                        if(this.form.value.CorreoElectronico == "" || this.form.value.CorreoElectronico == null ){
                            this.form.value.CorreoElectronico = this.form.value.TelefonoCorreo;
                        }
                    console.log("Conteniene: Correo");

                } else {
                    //Aqui asignamos Telefono
                    if(this.form.value.Telefono == "" || this.form.value.Telefono == null ){
                        this.form.value.Telefono = this.form.value.TelefonoCorreo;
                    }
                    console.log("Conteniene: Telefono");
                }
           // }
            
            /*********Termina funcion para validar si contiene Telefono o correo***********/
            /******Si la opcion de no me inter******/    
            
            let arm_bandera = "";

           // console.log("Valor de Transferencia: " + this.form.controls.Transferencia.value);
            // console.log("Valor de Programacion: " + this.form.controls.Programacion.value);

            if(this.form.controls.Transferencia.value == true){
                arm_bandera = "Cita-"+this.form.value.Asesor;
                console.log("Bandera Transferencia: "+arm_bandera);

            }else if(this.form.controls.Programacion.value == true){
                arm_bandera = "RLL-"+this.form.value.FechaCita+"-"+this.form.value.HoraCita+"-"+this.form.value.NumeroCelular;
                console.log("Bandera Programacion: "+arm_bandera);
            }

            const sendd = {

                Usuario: this.form.value.Usuario,                
                
                Canal: CanalV[1],   //Se envia Canal en vez de CanalPreferido             
                CSQ: this.form.value.CSQ,
                TelefonoCorreo: this.form.value.TelefonoCorreo,
                Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa) ? "" : this.form.value.Interesa_NoInteresa,
                

                Nombre: this.form.value.Nombre,
                ApellidoPaterno: this.form.value.ApellidoPaterno,
                ApellidoMaterno: this.form.value.ApellidoMaterno,
                CorreoElectronico: this.form.value.CorreoElectronico,                
               
                Genero: (this.form.value.Genero=='')? -1 : this.form.value.Genero,
                Edad: edadT,
               //SinCorreo: this.form.value.SinCorreo,
                
                NombreTutor: this.form.value.NombreTutor,
                ApellidoPaternoTutor: this.form.value.ApellidoPaternoTutor,
                ApellidoMaternoTutor: this.form.value.ApellidoMaternoTutor,
                CorreoElectronicoTutor: this.form.value.CorreoElectronicoTutor,
                
                ParentescoTutor: ParentescoV[0],
                GUIDParentescotutor: ParentescoV[1],
                
                Campus: CampusV[1],
                Nivel: NivelV[1],
                Modalidad: ModalidadV[1],
                Carrera: CarreraV[1],
                AreaInteres: InteresV[1],
                //Ciclo: CicloV[1],
                Ciclo:  ciclo,
                
                GUIDCampusCita: (CampusV[0] == '') ? null : CampusV[0],
                GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                GUIDUsuario:localStorage.getItem('UserId'),

                
                Banner: this.form.value.Banner,
                Bandera: (arm_bandera == '') ? null :arm_bandera,

                Tipificacion: this.form.value.Tipificacion,

                
                Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,
                

                CampusCita: (this.form.value.CampusCita == undefined || this.form.value.CampusCita=="") ? null : this.form.value.CampusCita,
                
                

                FechaCita: (this.form.value.FechaCita == undefined || this.form.value.FechaCita =="aN/aN/NaN") ? null : this.form.value.FechaCita,
                HoraCita: (this.form.value.HoraCita == undefined || this.form.value.HoraCita=="") ? "" : this.form.value.HoraCita,
                Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

                

                Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
                Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                fuenteobtencion: this.form.value.FuenteObtencion,
                //FuenteObtencion: this.form.value.FuenteObtencion,
                

                //Numero Celular
                Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
                TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                //Numero Telefono o Telefono Casa
                TelefonoCasa: this.form.value.Telefono,
                TelefonoCasaPredictivo:this.form.value.TelefonoPredictivo,
              

                //Numero Celular Tutor
                NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
                TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                //Numero Casa Tutor                
                TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

                // Ejecutivo: this.form.value.ParentescoTutor , 
                // SubTipoActividad: this.form.value.ParentescoTutor , 
                // SubSubTipoActividad:  this.form.value.ParentescoTutor,
                // EscuelaEmpresa:this.form.value.ParentescoTutor,
                // Calidad:this.form.value.ParentescoTutor, this.form.value.FechaCita

            };
 
            

            if (this.conEmail) {
                this.sendServ.sendData4(sendd)// this.form.value)
                    .subscribe(
                        (res: any) => {
                            console.log(res.status);
                            if (res.status == 200) {
                                this.showDialogE("Registro guardado con éxito.");
                                this.sendServ.sendData6(sendd)// this.form.value)
                                    .subscribe(
                                        (ress: any) => {
                                            console.log(ress.status);
                                            if (ress.status == 200) {
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
                                        (ress: any) => {
                                            console.log(ress.status);
                                            if (ress.status == 200) {
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
        window.location.href = "/register";
        this.form.reset();
        /*Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null)
          });*/
        //this.form.reset();
    }

    onKeyFechaNacimiento() {
        let edad = this.form.controls.Edad.value;
        let year = new Date().getFullYear();
        let fecha = year - edad;
        this.form.controls.FechaNacimiento.setValue("01/01/" + fecha);

        
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

    _keyPressNum(event: any, value: any, campus: any) {
        
        var cadena = campus.split('*');
        var word = cadena[0];

        //TelefonoCorreo
       /* if (value == '64bed5d6-404f-e811-8113-3863bb3c5058' || value == '66bed5d6-404f-e811-8113-3863bb3c5058' || value == '6abed5d6-404f-e811-8113-3863bb3c5058' || value == '6ebed5d6-404f-e811-8113-3863bb3c5058') {
            LandingValidation.onlyNumber(event);
            LandingValidation.limitChar(event, word);
            LandingValidation.onlyNumberIgual(event, word);
        }*/
    }

    onChange() {
        if (this.form.controls.Nombre.value != '' && this.form.controls.ApellidoPaterno.value != '' && this.form.controls.ApellidoMaterno.value != '' && this.form.controls.CorreoElectronico.value != '' && this.form.controls.NumeroCelular.value != '' && this.form.controls.Telefono.value != '') {
            this.form.controls.CampusCita.reset({ value: '', disabled: false });
            this.form.controls.FechaCita.reset({ value: '', disabled: false });
            this.form.controls.HoraCita.reset({ value: '', disabled: false });
            this.form.controls.Programacion.reset({ value: '', disabled: false });
            this.form.controls.Transferencia.reset({ value: '', disabled: false });
        } else {
            this.form.controls.CampusCita.reset({ value: '', disabled: true });
            this.form.controls.FechaCita.reset({ value: '', disabled: true });
            this.form.controls.HoraCita.reset({ value: '', disabled: true });
            this.form.controls.Programacion.reset({ value: '', disabled: true });
            this.form.controls.Transferencia.reset({ value: '', disabled: true });
        }
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

    onChangeInteresaNo(value) {
        if (value == '1') {
            this.form.controls.Nombre.reset({ value: '', disabled: true });
            this.form.controls.ApellidoPaterno.reset({ value: '', disabled: true });
            this.form.controls.ApellidoMaterno.reset({ value: '', disabled: true });
            this.form.controls.CorreoElectronico.reset({ value: '', disabled: true });
            this.form.controls.Genero.reset({ value: '', disabled: true });
            this.form.controls.NumeroCelular.reset({ value: '', disabled: true });
            this.form.controls.Telefono.reset({ value: '', disabled: true });
            this.form.controls.Edad.reset({ value: '', disabled: true });

            this.form.controls.NombreTutor.reset({ value: '', disabled: true });
            this.form.controls.ApellidoPaternoTutor.reset({ value: '', disabled: true });
            this.form.controls.ApellidoMaternoTutor.reset({ value: '', disabled: true });
            this.form.controls.CorreoElectronicoTutor.reset({ value: '', disabled: true });
            this.form.controls.ParentescoTutor.reset({ value: '', disabled: true });
            this.form.controls.NumeroCelularTutor.reset({ value: '', disabled: true });
            this.form.controls.TelefonoTutor.reset({ value: '', disabled: true });

            this.form.controls.Campus.reset({ value: '', disabled: true });
            this.form.controls.AreaInteres.reset({ value: '', disabled: true });
            this.form.controls.Nivel.reset({ value: '', disabled: true });
            this.form.controls.Modalidad.reset({ value: '', disabled: true });
            this.form.controls.Carrera.reset({ value: '', disabled: true });
            this.form.controls.Ciclo.reset({ value: '', disabled: true });

        } else {

            this.form.controls.Nombre.reset({ value: '', disabled: false });
            this.form.controls.ApellidoPaterno.reset({ value: '', disabled: false });
            this.form.controls.ApellidoMaterno.reset({ value: '', disabled: false });
            this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
            this.form.controls.Genero.reset({ value: '', disabled: false });
            this.form.controls.NumeroCelular.reset({ value: '', disabled: false });
            this.form.controls.Telefono.reset({ value: '', disabled: false });
            this.form.controls.Edad.reset({ value: '', disabled: false });

            this.form.controls.NombreTutor.reset({ value: '', disabled: false });
            this.form.controls.ApellidoPaternoTutor.reset({ value: '', disabled: false });
            this.form.controls.ApellidoMaternoTutor.reset({ value: '', disabled: false });
            this.form.controls.CorreoElectronicoTutor.reset({ value: '', disabled: false });
            this.form.controls.ParentescoTutor.reset({ value: '', disabled: false });
            this.form.controls.NumeroCelularTutor.reset({ value: '', disabled: false });
            this.form.controls.TelefonoTutor.reset({ value: '', disabled: false });

            this.form.controls.Campus.reset({ value: '', disabled: false });
            this.form.controls.AreaInteres.reset({ value: '', disabled: false });
            this.form.controls.Nivel.reset({ value: '', disabled: false });
            this.form.controls.Modalidad.reset({ value: '', disabled: false });
            this.form.controls.Carrera.reset({ value: '', disabled: false });
            this.form.controls.Ciclo.reset({ value: '', disabled: false });
            
        }
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

    onChangeCanal(campus: string) {
        var cadena = campus.split('*');
        var value = cadena[0];

        if (this.form.controls['CSQ'].disabled) {
            this.form.controls['CSQ'].enable();
        } else {
            this.form.controls['CSQ'].setValue('');
            this.form.controls['CSQ'].markAsUntouched();
        }
        this.csqs = this.csqServ.getCsqsByCanal(value);
    }

    onFielCanal(campus) {
        var cadena = campus.split('*');
        var value = cadena[0];

        this.canalText = value.toUpperCase();
        this.form.controls.TelefonoCorreo.clearValidators();

        //this.form.controls.TelefonoCorreo.reset({ value: '', disabled: false });
        

        
        //console.log("Canal.value: " + value);

        //Chat: 68bed5d6-404f-e811-8113-3863bb3c5058
        //Recuperacion: 70bed5d6-404f-e811-8113-3863bb3c5058 
        //Watts: 6abed5d6-404f-e811-8113-3863bb3c5058

       
        this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
        this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            


       
        //if ( value == '68bed5d6-404f-e811-8113-3863bb3c5058' || value == '70bed5d6-404f-e811-8113-3863bb3c5058' || value == '6abed5d6-404f-e811-8113-3863bb3c5058' ) {
        //    this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator(), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
          //  //this.form.controls.TelefonoCorreo.setValidators([]);
        //} else {

            //this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
            //this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            //}
       // this.form.controls.TelefonoCorreo.updateValueAndValidity();

       /* if (value == '68bed5d6-404f-e811-8113-3863bb3c5058' || value == '70bed5d6-404f-e811-8113-3863bb3c5058' || value == '64bed5d6-404f-e811-8113-3863bb3c5058' || value == '66bed5d6-404f-e811-8113-3863bb3c5058' || value == '6abed5d6-404f-e811-8113-3863bb3c5058' || value == '6ebed5d6-404f-e811-8113-3863bb3c5058') {
            this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10), Validators.maxLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
            
        } else {
            this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
        }
        this.form.controls.TelefonoCorreo.updateValueAndValidity();*/ /**/

    }

    addValidation(isChecked) {
        if (isChecked.checked) {
            if(this.form.controls.Telefono.value == ""){
                isChecked.source.checked = false
                this.showDialogE("Debes ingresar un teléfono de contacto");
                return false;
            }
            this.form.controls.CorreoElectronico.reset({ value: 'telefono@unitec.edu.mx', disabled: false });
            this.sinEmail = true;
            this.conEmail = false;
        } else {
            this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
            this.sinEmail = false;
            this.conEmail = true;

        }
        this.form.controls.CorreoElectronico.updateValueAndValidity();
    }

    addAsesor(isChecked) {
        if (isChecked.checked) {
            
            this.form.controls.Asesor.reset({ value: '', disabled: false });

            this.form.controls.CampusCita.reset({ value: '', disabled: true });
            this.form.controls.FechaCita.reset({ value: '', disabled: true });
            this.form.controls.HoraCita.reset({ value: '', disabled: true });
            this.form.controls.Programacion.reset({ value: '', disabled: true });
            
            
        
        } else {

            this.form.controls.CampusCita.reset({ value: '', disabled: false });
            this.form.controls.FechaCita.reset({ value: '', disabled: false });
            this.form.controls.HoraCita.reset({ value: '', disabled: false });
            this.form.controls.Programacion.reset({ value: '', disabled: false });
            

            this.form.controls.Asesor.reset({ value: '', disabled: true });
            
        
        }
        
        this.form.controls.Asesor.updateValueAndValidity();
    }

    checkProgramacion(isChecked) {
        if (isChecked.checked) {
            
            this.form.controls.Asesor.reset({ value: '', disabled: true });

            this.form.controls.CampusCita.reset({ value: '', disabled: true });
            this.form.controls.Transferencia.reset({ value: '', disabled: true });
            console.log('activo');

            
        
        } else {

            this.form.controls.Asesor.reset({ value: '', disabled: true });
            this.form.controls.CampusCita.reset({ value: '', disabled: false });
            this.form.controls.Transferencia.reset({ value: '', disabled: false });
            console.log('in activo');
        
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
            window.location.href = "/register";
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
        let ases = this.asesorServ.getAll()
            .subscribe(
                (data: AsesorCita[]) => this.asesores = data
            );
        
        localStorage.setItem('bandera',this.form.controls.Usuario.value);
        this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita - Alfonso Silva");
    }


    agruparDirectaClick(){

        let ases = this.asesorGrupalServ.getAll()
            .subscribe(
                (data: AsesorGrupal[]) => this.asesoresGrupal = data
            );

        this.showDialogForm(this.asesoresGrupal, "Selecciona a un Asesor", "SesionG - Alfonso Silva");
    }


    

}
