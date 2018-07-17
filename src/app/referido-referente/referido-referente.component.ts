import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';
//Interfaces
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { Nivel } from '../interfaces/nivel';
import { Modalidad } from '../interfaces/modalidad';
import { SendService } from '../providers/send.service';
import { Ciclo } from '../interfaces/ciclo';


//Servicios
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { ModalidadService } from '../providers/modalidad.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { CicloService } from '../providers/ciclo.service';

@Component({
  selector: 'app-referido-referente',
  templateUrl: './referido-referente.component.html',
  styleUrls: ['./referido-referente.component.scss']
})

export class ReferidoReferenteComponent implements OnInit {

  form: FormGroup;
  conEmail = true;
  
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

  ciclos: Ciclo[] = [];
  campus: Campus[] = [];
  carreras: Carrera[] = [];
  modalidades: Modalidad[] = [];
  niveles: Nivel[] = [];
  rows = [];
  campusTxt: any;
  nivelTxt: any;

  constructor(private landingService: LandingService,
    private gralService: GeneralService,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private campusServ: CampusService,
    private carreraServ: CarreraService,
    private sendServ: SendService,
    private modalidadServ: ModalidadService,
    private cicloServ: CicloService,
    private campusCarreraServ: CampusCarreraService) {
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

    //Se obtienen todos los ciclo
    this.cicloServ.getAll()
    .subscribe(
      (data: Ciclo[]) => this.ciclos = data
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
    let userLocal = localStorage.getItem('user');
        let datos = JSON.parse(userLocal);
    this.form = new FormGroup({
      Usuario: new FormControl({ value: datos.fullname, disabled: true }, Validators.required),

      Nombre: new FormControl('', [ LandingValidation.palabraMalaValidator()]),
      ApellidoPaterno: new FormControl('', [ LandingValidation.palabraMalaValidator()]),
      ApellidoMaterno: new FormControl('', [ LandingValidation.palabraMalaValidator()]),
      CorreoElectronico: new FormControl('', [Validators.required, LandingValidation.emailMaloValidator()]),
      cel: new FormControl('', [ Validators.minLength(10)]),
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

    if (this.form.value.Nombre == "" || this.form.value.Nombre == null) {
      this.showDialogE("Los datos de registro no estan llenos, favor de revisarlos.");
      return false;
    }

    if (this.form.value.ApellidoPaterno == "" || this.form.value.ApellidoPaterno == null){
      this.showDialogE("Los datos de registro no estan llenos, favor de revisarlos.");
      return false;
    }

    if (this.form.value.ApellidoMaterno == "" || this.form.value.ApellidoMaterno == null){
      this.showDialogE("Los datos de registro no estan llenos, favor de revisarlos.");
      return false;
    }

    if (this.form.value.Telefono == "" && this.form.value.CorreoElectronico == "" ) {
      this.showDialogE("Debes Ingresar un Telefono o Correo Electronico. ");
      return false;
    }

    if ( this.form.value.Telefono != "" && this.form.value.tipoCel == "" ) {
      this.showDialogE("Debes seleccionar un tipo de Telefono");
      return false;
    }

    // -------------------------------- Predictivo  ----------------------------------
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
        console.log('HERE');
      }

    }   

    const predTel = this.form.value.Telefono.substring(0, 2);

    console.log("predTel=" + predTel);

    this.form.value.Banner = window.location.href;

    this.form.value.TelefonoCelular = null;
    this.form.value.TelefonoPredictivo = null;
  
    this.form.value.TelefonoCasa = null;
    this.form.value.TelefonoCasaPredictivo = null;

    this.form.value.TelefonoOficina = null;
    this.form.value.TelefonoOficinaPredictivo = null;
    console.log(this.form.value.TelefonoPredictivo);

    if (this.form.value.tipoCel == "" && this.form.value.Telefono != "") {
      this.showDialogE("Ingresa un tipo de teléfono");
      return false;
    }

    if (this.form.value.tipoCel == "Celular") {
      if (predTel == "55") {
        this.form.value.TelefonoPredictivo = '9044' + this.form.value.Telefono;
      } else {
        this.form.value.TelefonoPredictivo = '9045' + this.form.value.Telefono;
      }
      console.log(this.form.value.TelefonoPredictivo);
    }else if (this.form.value.tipoCel == "Casa") {
      if (predTel == "55") {
        this.form.value.TelefonoCasaPredictivo = '9' + this.form.value.Telefono;
      } else {
        this.form.value.TelefonoCasaPredictivo = '901' + this.form.value.Telefono;
      }
    } else if (this.form.value.tipoCel == "Oficina") {
      if (predTel == "55") {
        this.form.value.TelefonoOficinaPredictivo = '9' + this.form.value.Telefono;

      } else {
        this.form.value.TelefonoOficinaPredictivo = '901' + this.form.value.Telefono;
      }
    }

    
  /*****Si no hay ciclo, se extrae de la base de datos el ciclo*******/

  this.form.value.FuenteObtencion = "";
  let ciclo_vigente = ""; 
  let ciclo_codigounico = "";
  let ciclo = "";
  let ciclo_nombreventas = "";


  console.log("localStorage.getItem('ciclo_name') = " + localStorage.getItem('ciclo_name'));
  let ciclo_name = (localStorage.getItem('ciclo_name') == null) ? "18-3" : localStorage.getItem('ciclo_name'); 



  for(let i = 0 ; i <= this.ciclos.length ; i++ ){
      if(this.ciclos[i] !== undefined){ 
        if( this.ciclos[i].crmit_ciclovigenteventas == "true") {

              ciclo_vigente = this.ciclos[i].crmit_name;
              ciclo_nombreventas = this.ciclos[i].nombreventas;
              ciclo_codigounico = this.ciclos[i].crmit_codigounico;
              
            }
      }    

  }

  for (let i = 0; i < this.rows.length; i++) {

       
    if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == ciclo_nombreventas) {
      var __ciclo = this.rows[i].CICLO;
      this.form.value.Team = this.rows[i].TEAM;
      var __team =  this.rows[i].TEAM;
      this.form.value.Prioridad = this.rows[i].PRIORIDAD;
      this.form.value.Attemp = this.rows[i].ATTEMP;
      this.form.value.FuenteObtencion = this.rows[i].FUENTE_NEGOCIO;

    }
    
  }
 ciclo = ciclo_vigente;


 // -------------------------------- Predictivo  -----------------------------------
        

    console.log(this.form.value.TelefonoPredictivo);
            let edadT = this.form.value.Edad;

            if (edadT == "") {
                edadT = 12;
            }
            let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
            let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel; 
            let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad; 
            let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera;
            
            
            let CampusV = _Campus.split('*');
            let NivelV = _Nivel.split('*');
            let ModalidadV = _Modalidad.split('*');
            let CarreraV = _Carrera.split('*');
             

            let u = localStorage.getItem('user');
            let data = JSON.parse(u);
            let nom_usu = data.fullname;

            const sendd = {

              Usuario:  nom_usu,
              TelefonoPredictivo: this.form.value.TelefonoPredictivo,
              TelefonoCasaPredictivo: this.form.value.TelefonoCasaPredictivo,
              TelefonoOficinaPredictivo: this.form.value.TelefonoOficinaPredictivo,

                

                Nombre: this.form.value.Nombre,
                ApellidoPaterno: this.form.value.ApellidoPaterno,
                ApellidoMaterno: this.form.value.ApellidoMaterno,
                CorreoElectronico: this.form.value.CorreoElectronico,
                
                Telefono: (this.form.value.tipoCel == "Celular") ? this.form.value.Telefono:null,
                TelefonoCasa: (this.form.value.tipoCel == "Casa")? this.form.value.Telefono:null, 
                TelefonoOficina: (this.form.value.tipoCel == "Oficina")? this.form.value.Telefono:null, 
                
                
              
                Genero: (this.form.value.Genero=='')? -1 : this.form.value.Genero,
                
                Campus: CampusV[1],
                Nivel: NivelV[1],
                Modalidad: ModalidadV[1],
                Carrera: CarreraV[1],
               
                
                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                 
                GUIDUsuario:localStorage.getItem('UserId'),
                

                Banner: this.form.value.Banner,
                
              Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
              Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
              Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
              FuenteObtencion: this.form.value.FuenteObtencion,
              Ciclo: ciclo,
              GUIDCiclo: ciclo_codigounico,
                
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
        this.mostrarExtension = true;
  }

  resetForm() {
    window.location.href = "/referidoReferente";
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
    if (this.form.controls.tipoCel.value == 'Oficina' ) {
      this.mostrarExtension=false;
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


  private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: {message: message}
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.href = "/referidoReferente";
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
