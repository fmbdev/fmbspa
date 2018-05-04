import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Modalidad } from '../interfaces/modalidad';
import { Nivel } from '../interfaces/nivel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ModalidadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private modalidades: Modalidad[] = [];
  private niveles: Nivel[] = [];

  constructor(private http: Http) { }

  getModalidadNivel() {
    this.http.get("https://devmx.com.mx/fmbapp/public/api/modalidad", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: any[]) => {
            for(let i = 0; i < data.length; i++){
              let modalidad = {crmit_codigounico: data[i].crmit_codigounico, crmit_name: data[i].crmit_name};
              this.modalidades.push(modalidad);

              let nivel = {crmit_nivelinteresid: data[i].crmit_nivelinteresid, crmit_nivelinteresidname: data[i].crmit_nivelinteresidname};
              this.niveles.push(nivel);
            }
          }
        )
               
  }

  getModalidades(): Modalidad[]{
    return this.modalidades; 
  }

  getNiveles() : Nivel[] {
    return this.niveles;
  }

}
