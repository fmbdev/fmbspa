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
import { AsesorGrupal } from '../interfaces/asesor-grupal';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';
import { TipoActividad } from '../interfaces/tipo-actividad';
import { Turno } from '../interfaces/turno';
import { FuenteObtencion } from '../interfaces/fuenteobtencion';


import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { TurnoService } from '../providers/turno.service';
import { FormatService } from '../providers/format.service';
import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { AsesorGrupalService } from '../providers/asesor-grupal.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { TipificacionService } from '../providers/tipificacion.service';
import { TipoActividadService } from '../providers/tipo-actividad.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { FuenteObtencionService } from '../providers/fuenteobtencion.service';

@Component({
  selector: 'app-new-register-solo',
  templateUrl: './new-register-solo.component.html',
  styleUrls: ['./new-register-solo.component.scss']
})

export class NewRegisterSoloComponent implements OnInit {

    form: FormGroup;
    sinEmail=false;
    conEmail = true;


    //maxDate = new Date(2018, this.month.getMonth(),12);
    maxDate = LandingValidation.fechaLimite();
    startDate = LandingValidation.fechaInicio();

    ejecutivo: FormControl;
    actvidadNoTradicional: FormControl;
    subTipoActividad: FormControl;
    company: FormControl;
    SubSubTipoActividad: FormControl;
    turno: FormControl;
    school: FormControl;
    Calidad: FormControl;

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
    SinCorreo: FormControl;

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
    asesorGrupal: AsesorGrupal[] = [];
    carreras: Carrera[] = [];
    intereses: Interes[] = [];
    modalidades: Modalidad[] = [];
    campus_citas: CampusCita[] = [];
    parentescos: Parentesco[] = [];
    tipificaciones: Tipificacion[] = [];
    tipo_actividades: TipoActividad[] = [];
    turnos: Turno[] = [];
    fuentesobtencion: FuenteObtencion[] = [];
    rows = [];
    campusTxt: any;
    nivelTxt: any;

    constructor(private landingService: LandingService,
        private gralService: GeneralService,
        public dialog: MatDialog,
        private renderer: Renderer2,
        private pnnServ: PnnService,
        private csqServ: CsqService,
        private horaServ: HoraService,
        private sendServ: SendService,
        private cicloServ: CicloService,
        private turnoServ: TurnoService,
        private canalServ: CanalService,
        private campusServ: CampusService,
        private asesorServ: AsesorService,
        private asesorGrupalServ: AsesorGrupalService,
        private formatServ: FormatService,
        private generoServ: GeneroService,
        private carreraServ: CarreraService,
        private interesServ: InteresService,
        private modalidadServ: ModalidadService,
        private parentescoServ: ParentescoService,
        private tipoActServ: TipoActividadService,
        private campusCitaServ: CampusCitaService,
        private tipicicacionServ: TipificacionService,
        private campusCarreraServ: CampusCarreraService,
        private fuenteobtencionServ: FuenteObtencionService,) {
      this.fetch((data) => {
        this.rows = data;
      });
    }


    ngOnInit() {
        localStorage.setItem('bandera','');
        this.landingService.getInit();

        // Se obtiene los tipos de actividades
        this.tipoActServ.getAll()
            .subscribe(
                (data: TipoActividad[]) => this.tipo_actividades = data
            )
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

        //Se obtiene todos los fuente obtencion
        this.fuenteobtencionServ.getAll()
        .subscribe(
        (data: FuenteObtencion[]) => this.fuentesobtencion = data
        )    
          
        this.formInit();
    }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/solovinos.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

    formInit() {

        let userLocal = localStorage.getItem('user');
        let datos = JSON.parse(userLocal);
        
        this.form = new FormGroup({

            Usuario: new FormControl({ value: datos.fullname, disabled: false }),
            SinCorreo: new FormControl(''),

            Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
            NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Genero: new FormControl(''),
            FechaNacimiento: new FormControl(''),
            Edad: new FormControl('', [Validators.minLength(2), LandingValidation.edadMinValidator()]),

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

        if (this.sinEmail) {
            this.form.controls.CorreoElectronico.clearValidators();
        }else{
            if (this.form.controls['CorreoElectronico'].value != "") {
                this.form.controls.Telefono.clearValidators();
                this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
                this.form.controls.Telefono.updateValueAndValidity();
            } else {
                let tel = this.form.controls['Telefono'].value;
                if (tel) {
                    this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                    this.form.controls.CorreoElectronico.clearValidators();
                    this.form.controls.CorreoElectronico.updateValueAndValidity();
                    this.conEmail = false;
                }
            }
        }


        if (this.form.valid) {
            if (this.sinEmail) {
                let tel = this.form.controls['Telefono'].value;
                this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                this.conEmail = false;
            }

          // -------------------------------- Predictivo  ----------------------------------

          let tel_casa_predictivo = "";

             const predTel = this.form.value.Telefono.substring(0,2);
            if(predTel == 55){
              this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
              tel_casa_predictivo = "9"+this.form.value.Telefono;

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
         
            this.form.value.Banner = window.location.href;
            this.form.value.FuenteObtencion = "";

            let _Ciclo = (this.form.value.Ciclo == null) ? "" : this.form.value.Ciclo;
            let CicloV = _Ciclo.split('*');
            let ciclo = "";
            let nombre_ventas = "";

            //console.log("Ciclo del form: " + CicloV);
            //console.log(" " );
            //console.log(" " );console.log(" " );
            //console.log(" " );console.log(" " );
            //En caso de ser 18-3, esos son los resultados y ubicacion de var
            //console.log('CicloV[0] : '+CicloV[0]); //id
            //console.log('CicloV[1] : '+CicloV[1]); //18-3
            //console.log('CicloV[2] : '+CicloV[2]); //true
            //console.log('CicloV[3] : '+CicloV[3]); //Mayo
            //console.log('CicloV[4] : '+CicloV[4]); //C2

            let f_negocio = "";

     
            let main_carrera = this.form.value.Carrera.split("*");

            for (let i = 0; i < this.carreras.length; i++) {
  
              if(this.carreras[i].BL == main_carrera[2] && this.carreras[i].codigounico == main_carrera[0]){
  
              console.log("");console.log("");console.log("");console.log("");
              console.log("codigo unico de carrera:"+this.carreras[i].codigounico);
              console.log("Nombre de carrera:"+this.carreras[i].name);
              console.log("BL de Carrera:"+this.carreras[i].BL);
              console.log("");console.log("");console.log("");console.log("");
  
  
                  /**Re calcula el team prioridad y attemp con respecto a la universidad**/
  
                  for (let j = 0; j < this.rows.length; j++) {
                  
                      nombre_ventas = (CicloV[4] == "") ? "" : CicloV[4];
      
                      //if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == nombre_ventas) {
                      if (this.rows[j].FUENTE_NEGOCIO == "SOLOVINOS" && this.rows[j].CICLO == nombre_ventas && this.rows[j].CAMPUS == this.campusTxt && this.rows[j].BL == this.carreras[i].BL ) {
                        
                          this.form.value.Team = this.rows[j].TEAM;
                          console.log("TEAM : " + this.form.value.Team);
                          this.form.value.Prioridad = this.rows[j].PRIORIDAD;
                          console.log("Prioridad : " + this.form.value.Prioridad);
                          this.form.value.Attemp = this.rows[j].ATTEMP;
                          console.log("ATTEMP : " + this.form.value.Attemp);
                          this.form.value.FuenteObtencion = this.rows[j].FUENTE_NEGOCIO;
                          console.log("Fuente Obtencion : " + this.form.value.FuenteObtencion);
                          f_negocio = this.rows[i].FUENTE_NEGOCIO;
      
      
                      }
      
                  }
  
                  /**TErmina calculo de team prioridad y attemp con respecto a la universidad**/
              }
  
          }

            ciclo = CicloV[1];


                 /***********Fuente Obtencion Begin***********/

      let f_o = "";
      let fuente_obtencion_nombre = "";
      let fuente_obtencion_GUID = "";

      f_o = this.form.value.FuenteObtencion;
      //console.log("this.form.value.FuenteObtencion = "+f_o);
      if(f_o == "" || f_o == null){
        fuente_obtencion_nombre = "SOLOVINOS";
      }else{
        this.form.value.FuenteObtencion = "SOLOVINOS";
        fuente_obtencion_nombre = "SOLOVINOS";
      }

      
      let fo = "";
      
      for(let i = 0 ; i <= this.fuentesobtencion.length ; i++ ){

        if(this.fuentesobtencion[i] !== undefined){ 
          if( this.fuentesobtencion[i].fuente_name == fuente_obtencion_nombre) {

            fuente_obtencion_GUID = this.fuentesobtencion[i].fuente_GUID;  
                
              }
        } 
                  
      }
          console.log("___________________________________________");
          console.log(""); console.log(""); console.log("");
          console.log("Fuentes obtencion: " + fuente_obtencion_nombre); 
          console.log("Fuente Guid: " + fuente_obtencion_GUID); 
          console.log("Fuente Negocio: " + f_negocio);
          console.log("");console.log("");console.log("");  
          console.log("___________________________________________");

     /***********Fuente Obtencion End***********/     


          // -------------------------------- Predictivo  ----------------------------------
          let edadT = this.form.value.Edad;

            if(edadT==""){
                edadT = 12;                
            }

            let bandera = localStorage.getItem('bandera');
            
            /* Interes GUID */
            let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
            let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel; 
            let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad; 
            let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera; 
            let _Interes = (this.form.value.AreaInteres == null) ? "" : this.form.value.AreaInteres; 
            let _Parentesco = (this.form.value.ParentescoTutor == null) ? "" : this.form.value.ParentescoTutor; 
            
            let CampusV = _Campus.split('*');
            let NivelV = _Nivel.split('*');
            let ModalidadV = _Modalidad.split('*');
            let CarreraV = _Carrera.split('*');
            let InteresV = _Interes.split('*');
            let ParentescoV = _Parentesco.split('*');

            const sendd = {    

            Usuario: this.form.value.Usuario, 
                    
            Nombre: this.form.value.Nombre, 
            ApellidoPaterno: this.form.value.ApellidoPaterno, 
            ApellidoMaterno: this.form.value.ApellidoMaterno, 
            CorreoElectronico: this.form.value.CorreoElectronico,
            Genero: (this.form.value.Genero=='')? -1 : this.form.value.Genero,
            Edad:edadT, 

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
            Ciclo:  ciclo,
            FuenteNegocio : (f_negocio == "")? "" : f_negocio,
            
            GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
            GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
            GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
            GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],            
            GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
            GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
            GUIDUsuario:localStorage.getItem('UserId'),
            GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3c89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
             

            Banner: this.form.value.Banner,
            Bandera: (bandera==null)? "" :bandera,

            Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
            Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
            Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
            fuenteobtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

            //Numero Celular
            Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
            TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
            //Numero Telefono o Telefono Casa
            TelefonoCasa: this.form.value.Telefono,
            TelefonoCasaPredictivo: tel_casa_predictivo,
              

            //Numero Celular Tutor
            NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
            TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
            //Numero Casa Tutor                
            TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
            TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

          };
             
            //console.log("this.conEmail");
            //console.log(this.conEmail);
            if (this.conEmail) {
                this.sendServ.sendData4(sendd)// this.form.value)
                    .subscribe(
                        (res: any) => {
                            //console.log(res.status);
                            if (res.status == 200) {
                                this.showDialogE("Registro guardado con éxito.");
                                this.sendServ.sendData6(sendd)// this.form.value)
                                    .subscribe(
                                        (ress: any) => {
                                            //console.log(ress.status);
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
        window.location.href = "/registerSolo";
        this.form.reset();
    }

    onKeyFechaNacimiento() {
        let edad = this.form.controls.Edad.value;
        let year = new Date().getFullYear();
        let fecha = year - edad;
        this.form.controls.FechaNacimiento.setValue('01/01/'+fecha);
    }
    agruparClick(){
        let ases = this.asesorServ.getAll()
            .subscribe(
                (data: Asesor[]) => this.asesores = data
            );
        this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita-");
    }

    agruparDirectaClick() {
        //let nivelG = 'Posgrado';
        let k = this.form.controls.Nivel.value;
        let g = k.split('*');
        let nivelG = g[0];
        //console.log(nivelG);
        if(nivelG){
           let asess = this.asesorGrupalServ.getAll()
            .subscribe(
                (datat: AsesorGrupal[]) => this.asesorGrupal = datat
            )    
            setTimeout(() => {
                this.showDialogForm(this.asesorGrupal, "Selecciona a un Asesor Grupal", "SesiónG-");
            }, 1000); 
        }else{
            this.showDialogE("Seleccione un Nivel");
        }
    }

    agruparDClick(){
        localStorage.setItem('bandera',this.form.controls.Usuario.value);
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
        //console.log(campus);
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
        //console.log(campus);

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

        //console.log(campus);

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
            if(this.form.controls.Telefono.value == ""){
                isChecked.source.checked = false
                this.showDialogE("Debes ingresar un teléfono de contacto");
                return false;
            }
            this.form.controls.CorreoElectronico.reset({ value: 'telefono@unitec.edu.mx', disabled: false });
            this.sinEmail = true;
            //this.form.controls.SinCorreo.reset({ value: 'no', disabled: false });
            this.conEmail = false;

        } else {
            this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
           // this.form.controls.SinCorreo.reset({ value: 'ok', disabled: false });
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
            window.location.href = "/registerSolo";
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
}
