import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AsesorGrupal } from '../interfaces/asesor-grupal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AsesorGrupalService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(tipo:string) : Observable<AsesorGrupal[]>{
    return this.http.get("https://devmx.com.mx/fmbapp/public/api/asesor-grupal/"+tipo, {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }
}
