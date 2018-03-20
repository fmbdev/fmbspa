import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
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
import { AsesorService } from '../providers/asesor.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { ParentescoService } from '../providers/parentesco.service'; 
import { TipificacionService } from '../providers/tipificacion.service';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.scss']
})
export class NuevoRegistroComponent implements OnInit {

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
  sexos: [{},{}] = [{"name":"Hombre"},{"name":"Mujer"}]; 

  constructor(private formBuilder: FormBuilder,
              private csqServ: CsqService,
              private horaServ: HoraService,
              private nivelServ: NivelService,
              private cicloServ: CicloService,
              private canalServ: CanalService,
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

  private initForm(){
    this.registerForm = this.formBuilder.group({
      /*-- Campo Usuario (u) --*/
      u_name: [''],
      /*-- Campos para seción Origen Llamada (oll) -- */
      oll_canal: ['', Validators.required],
      oll_csq: ['', Validators.required],
      oll_telefono: ['', Validators.required],
      oll_interes: ['',Validators.required],
      /*-- Campos para sección de Contato -- */
      /*-- Prospecto (p) --*/
      p_nombre: ['', [Validators.required, Validators.minLength(3)]],
      p_apellido_paterno: ['', [Validators.required, Validators.minLength(3)]],
      p_apellido_materno: ['', [Validators.required, Validators.minLength(3)]],
      p_email: ['', [Validators.required, Validators.email]],
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
      int_interes: ['', Validators.required],
      /*-- Campos para sección de Cita (cit) -- */
      cit_campus: ['', Validators.required],
      cit_fecha: ['', Validators.required],
      cit_asesor: ['', Validators.required],
      cit_hora: ['', Validators.required],
      cit_prog_llamada: [''],
      cit_transf_line: [''],
      /*-- Campos para sección de Tipificacion (tip) -- */
      tip_tipificacion: ['', Validators.required],
      tip_notas: ['']
    });
  }

}
