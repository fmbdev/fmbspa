import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
 
import { NivelService } from '../providers/nivel.service';
import { CicloService } from '../providers/ciclo.service';
import { CanalService } from '../providers/canal.service';
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { ParentescoService } from '../providers/parentesco.service'; 

@Component({
  selector: 'app-nuevo-registro-solovino',
  templateUrl: './nuevo-registro-solovino.component.html',
  styleUrls: ['./nuevo-registro-solovino.component.scss']
})
export class NuevoRegistroSolovinoComponent implements OnInit {

  private registerForm: FormGroup;
  private ciclos: Ciclo[] = [];
  private niveles: Nivel[] = [];
  private canales: Canal[] = [];
  private campus: Campus[] = [];
  private carreras: Carrera[] = [];
  private intereses: Interes[] = [];
  private modalidades: Modalidad[] = [];
  private parentescos: Parentesco[] = [];
  private sexos: [{},{}] = [{"name":"Hombre"},{"name":"Mujer"}];

  constructor(private formBuilder: FormBuilder,
    private nivelServ: NivelService,
    private cicloServ: CicloService,
    private canalServ: CanalService,
    private campusServ: CampusService,
    private carreraServ: CarreraService,
    private interesServ: InteresService,
    private modalidadServ: ModalidadService,
    private parentescoServ: ParentescoService) { }

    ngOnInit() {
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

      this.initForm();
    }

    onSubmit(){
      console.log(this.registerForm.value);
    }
  
    resetForm(){
      this.registerForm.reset();
    }
  
    private initForm(){
      this.registerForm = this.formBuilder.group({
        /*-- Campo Usuario (u) --*/
        u_name: ['', Validators.required],
        /*-- Campos para sección de Contato -- */
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
        p_fecha_nacimiento: [''],
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
        int_interes: ['', Validators.required]
      });
    }

}
