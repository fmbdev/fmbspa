import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { CampusNivel } from '../interfaces/campus-nivel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Carrera } from '../interfaces/carrera';
import { CarreraService } from './carrera.service';

import { Modalidad } from '../interfaces/modalidad';
import { ModalidadService} from './modalidad.service';

import { Nivel } from '../interfaces/nivel';
import { NivelService } from './nivel.service';

@Injectable()
export class CampusNivelService {

  private headers = new Headers({'Content-Type':'application/json'});

  private campusNivel: CampusNivel[] = [];

  constructor(private http: Http,
              private nivelServ: NivelService,
              private carreraServ: CarreraService,
              private modalidadServ: ModalidadService) { }

  getAll(){
    this.http.get("https://devmx.com.mx/fmbapp/public/api/campus_nivel", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: CampusNivel[]) => this.campusNivel = data
          
        )
  }

  getCarrearasByCampus(campusId: string) : Carrera[] {
    let carreraId: string[] = [];

    for(let i = 0; i < this.campusNivel.length; i++){
      if(campusId == this.campusNivel[i].campus_crmit_codigounico){
        carreraId.push(this.campusNivel[i].carrera_codigounico);
      }
    }

    let carreras = this.carreraServ.getCarreras();
    let carrerasByCampus: Carrera[] = [];

    for(let i = 0; i < carreraId.length; i++){
      for(let j = 0; j < carreras.length; j++){
        if(carreraId[i] == carreras[j].codigounico){
          carrerasByCampus.push(carreras[j]);
        }
      }
    }
    return carrerasByCampus;
  }

  getModalidadByCarrera(carreraId: string) {
    let modalidadId: string[] = [];

    for(let i = 0; i < this.campusNivel.length; i++){
      if(carreraId == this.campusNivel[i].carrera_codigounico ){
        modalidadId.push(this.campusNivel[i].modalidad_crmit_codigounico);
      }
    }

    let modalidades = this.modalidadServ.getModalidades();
    let modalidadesByCarerra: Modalidad[] = [];

    for(let i = 0; i < modalidadId.length; i++){
      for(let j = 0; j < modalidades.length; j++){
        if(modalidadId[i] == modalidades[j].crmit_codigounico){
          modalidadesByCarerra.push(modalidades[j]);
        }
      }
    }
    return modalidadesByCarerra;
  }

  getNivelByCarrera(carreraId: string){
    let nivelId: string[] = [];

    for(let i = 0; i < this.campusNivel.length; i++){
      if(carreraId == this.campusNivel[i].carrera_codigounico){
        nivelId.push(this.campusNivel[i].nivelestudios_crmit_codigounico);
      }
    }

    let niveles = this.nivelServ.getNiveles();
    let nivelesByCarrera: Nivel[] = [];

    for(let i = 0; i < nivelId.length; i++){
      for(let j = 0; j < niveles.length; j++){
        if(nivelId[i] == niveles[j].crmit_codigounico){
          nivelesByCarrera.push(niveles[j]);
        }
      }
    }
    return nivelesByCarrera;
  }

}
