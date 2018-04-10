import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

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
import { Tipificacion } from '../interfaces/tipificacion';

import { CsqService } from '../providers/csq.service'; 
import { HoraService } from '../providers/hora.service';
import { SendService } from '../providers/send.service';
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
import { TipificacionService } from '../providers/tipificacion.service';

@Component({
  selector: 'app-nuevo-registro-solovino',
  templateUrl: './nuevo-registro-solovino.component.html',
  styleUrls: ['./nuevo-registro-solovino.component.scss']
})
export class NuevoRegistroSolovinoComponent implements OnInit {

  registerForm: FormGroup;
  csqs: Csq[] = [];
  horas: Hora[] = [];
  ciclos: Ciclo[] = [];
  niveles: Nivel[] = [];
  canales: Canal[] = [];
  campus: Campus[] = [];
  asesores: Asesor[] = [];
  carreras: Carrera[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  parentescos: Parentesco[] = [];
  tipificaciones: Tipificacion[] = [];
  generos: Genero[] = [];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private csqServ: CsqService,
              private horaServ: HoraService,
              private sendServ: SendService,
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
    // Se obtienen todos los generos
    this.generoServ.getAll()
        .subscribe(
          (data: Genero[]) => this.generos = data
        )
    // Se obtienen todas las tipificaciones
    this.tipicicacionServ.getAll()
        .subscribe(
          (data: Tipificacion[]) => this.tipificaciones = data
        )
    // Se obtienen todos los intereses
    this.interesServ.getAll()
        .subscribe(
          (data: Interes[]) => this.intereses = data
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
    // Se obtienen todos lo asesores
    this.asesorServ.getAll()
        .subscribe(
          (data: Asesor[]) => this.asesores = data
        )
    // Se obtienen todas las hora para asignar una cita
    this.horaServ.getAll()
        .subscribe(
          (data: Hora[]) => this.horas = data
        )

    this.initForm();
  }

  onSubmit(){
    this.sendServ.sendDataToApi(this.registerForm.value)
       .subscribe(
         (res: Response) => {
           if(res.status == 200){
             this.showDialog("Los datos se han guardado correctamente.");
           }else{
             this.showDialog("Error al realizar el registro.");
           }
         }
       )
  }

  resetForm(){
    this.registerForm.reset();
  }

  getErrorMessage(){
    return this.registerForm.controls['oll_canal'].hasError('required') ? "Elige un canallll" : ""
  }

    onKeydownNumber(event: KeyboardEvent) {
    var charStr = String.fromCharCode(event.keyCode);
    if (/[0-9]/i.test(charStr)) {
      return true;
    }else{
      return false;      
    }
  }

  onKeydownLetter(event: KeyboardEvent) {
    var charStr = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/i.test(charStr)) {
      return ;
    }else{
      return false;
    }
  }

  private showDialog(message: string){
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '180px',
      width: '500px',
      data: {message: message}
    });
  }
  
    private initForm(){
    this.registerForm = this.formBuilder.group({
      /*-- Campo Usuario (u) --*/
      Usuario: [{value: 'Ricardo Vargas', disabled: true}],
      /*-- Campos para sección de Contato -- */
      /*-- Prospecto --*/
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoPaterno: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoMaterno: ['', [Validators.required, Validators.minLength(3)]],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      SinCorreo: [''],
      NumeroCelular: ['', Validators.required],
      Telefono: ['', Validators.required],
      Genero: ['', Validators.required],
      CanalPreferido: ['', Validators.required],
      FechaNacimiento: [{value: '', disabled: true}, Validators.required],
      Edad: ['', Validators.required],
      /* -- Quien registra --*/
      NombreTutor: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoPaternoTutor: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoMaternoTutor: ['', [Validators.required, Validators.minLength(3)]],
      CorreoElectronicoTutor: ['', [Validators.required, Validators.email]],
      NumeroCelularR: ['', Validators.required],
      TelefonoTutor: ['', Validators.required],
      ParentescoTutor: ['', Validators.required],
      /*-- Campos para sección de Interes -- */
      Campus: ['', Validators.required],
      Nivel: ['', Validators.required],
      Modalidad: ['', Validators.required],
      Carrera: ['', Validators.required],
      Ciclo: ['', Validators.required],
      AreaInteres: ['', Validators.required],
    });
  }

}
