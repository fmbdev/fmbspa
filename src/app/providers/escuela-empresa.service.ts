import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EscuelaEmpresaService {

  private headers = new Headers({'Content-Type':'application/json'});
  private escuelaEmpresas: EscuelaEmpresa[] = [];

  constructor( private http: Http) {}

  getAll() : Observable<EscuelaEmpresa[]>{
    return this.http.get("https://devmx.com.mx/fmbapp/public/api/escuela_empresa", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
               .do(
                 (data: EscuelaEmpresa[]) => this.escuelaEmpresas = data
               )

  }

  /*getEscuelasEmpresas() : EscuelaEmpresa[] {
    return this.escuelaEmpresas;
  }*/

  getCalidadByEscuelaEmpresa(escuelaId: string) : String{
    console.log(escuelaId);
    let calidad_name: string = "";
    for(let i = 0; i < this.escuelaEmpresas.length; i++){
      if(escuelaId == this.escuelaEmpresas[i].crmit_calidadid){
        calidad_name = this.escuelaEmpresas[i].crmit_calidadidname;
      }
    }
    if(calidad_name != ""){
      return calidad_name;
    }else{
      return null;
    }
  }

}
