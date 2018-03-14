import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Equi } from '../interfaces/equi';
import { Asesor } from '../interfaces/asesor';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { Tipificacion } from '../interfaces/tipificacion';

import { CsqService } from '../providers/csq.service'; 
import { HoraService } from '../providers/hora.service';
import { NivelService } from '../providers/nivel.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { EquiService } from '../providers/equi.service';
import { AsesorService } from '../providers/asesor.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { ParentescoService } from '../providers/parentesco.service'; 
import { TipificacionService } from '../providers/tipificacion.service';

@Component({
  selector: 'app-referidos-promotor',
  templateUrl: './referidos-promotor.component.html',
  styleUrls: ['./referidos-promotor.component.scss']
})

export class ReferidosPromotorComponent implements OnInit {

  private registerForm: FormGroup;
  private csqs: Csq[] = [];
  private horas: Hora[] = [];
  private ciclos: Ciclo[] = [];
  private niveles: Nivel[] = [];
  private canales: Canal[] = [];
  private campus: Campus[] = [];
  private equis: Equi[] = [];
  private asesores: Asesor[] = [];
  private carreras: Carrera[] = [];
  private intereses: Interes[] = [];
  private modalidades: Modalidad[] = [];
  private parentescos: Parentesco[] = [];
  private tipificaciones: Tipificacion[] = [];
  private sexos: [{},{}] = [{"name":"Hombre"},{"name":"Mujer"}]; 

  constructor(private formBuilder: FormBuilder,
              private csqServ: CsqService,
              private horaServ: HoraService,
              private nivelServ: NivelService,
              private cicloServ: CicloService,
              private canalServ: CanalService,
              private equiServ: EquiService,
              private campusServ: CampusService,
              private asesorServ: AsesorService,
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
    // Se obtienen todos los equi
    this.equiServ.getAll()
      .subscribe(
        (data: Equi[]) => this.equis = data
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
    console.log(this.registerForm.value);
  }

  resetForm(){
    this.registerForm.reset();
  }

  onKeydownNumber(event: KeyboardEvent) {
    var charStr = String.fromCharCode(event.keyCode);
    if (/[0-9]/i.test(charStr)) {
      return false;
    }else{
      return true;      
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

  getErrorMessageTipificacion(){    
    return this.registerForm.controls['tip_tipificacion'].hasError('required') ? "Elige una Tipificación" : ""
  }
  getErrorMessageCsq() {
    return this.registerForm.controls['tip_csq'].hasError('required') ? "Elige una Csq" : ""
  }
  getErrorMessageCanal() {
    return this.registerForm.controls['tip_csq'].hasError('required') ? "Elige una Csq" : ""
  }
  getErrorMessage(control: string, error: string,mensaje:string){
    return this.registerForm.controls[control].hasError(error) ? mensaje : ""
  }

  private initForm(){

    this.registerForm = this.formBuilder.group({
      /*-- Campos para sección de Tipificacion (tip) -- */
      tip_canal: ['', Validators.required],
      tip_csq: ['', Validators.required],
      tip_tipificacion: ['', Validators.required],     
      tip_interes: ['', Validators.required],
      tip_notas: ['', Validators.required],
      

      /*-- Prospecto (p) --*/
      p_nombre: ['', Validators.required],
      p_apellido_paterno: ['',Validators.required],
      p_apellido_materno: ['', Validators.required],
      p_email: ['',Validators.required],
      p_noemail: [''],
      p_telefono_mobil: ['', Validators.required],
      p_telefono: [''],
      p_genero: ['', Validators.required],
      p_canal_preferido: ['', Validators.required],
      p_fecha_nacimiento: ['', Validators],
      p_edad: ['', Validators.required],

      /* -- Quien registra (q)--*/
      q_nombre: ['', Validators.required],
      q_apellido_paterno: ['',Validators.required],
      q_apellido_materno: ['', Validators.required],
      q_email: ['',Validators.required],
      q_telefono_mobil: ['', Validators.required],
      q_telefono: [''],
      q_parentesco: ['', Validators.required],
      /*-- Campos para sección de Interes (int) -- */
      int_campus: ['', Validators.required],
      int_nivel: ['', Validators.required],
      int_modalidad: ['', Validators.required],
      int_carrera: ['', Validators.required],
      int_ciclo: ['', Validators.required],
      int_num_per: ['', Validators.required],
      int_venta: ['', Validators.required],
      int_num_cuenta: ['', Validators.required],

      /*-- Campos para sección de Cita (cit) -- */
      cit_campus: ['', Validators.required],
      cit_fecha: ['', Validators.required],
      cit_hora: ['', Validators.required],
      cit_equi: ['', Validators.required],

      cit_prog_llamada: [''],
      cit_transf_line: [''],
      
      u_name: [''],
    });
  }

}
