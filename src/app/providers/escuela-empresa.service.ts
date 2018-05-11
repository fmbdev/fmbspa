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

  }

  /*getEscuelasEmpresas() : EscuelaEmpresa[] {
    return this.escuelaEmpresas;
  }*/
}
