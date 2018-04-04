import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Equi } from '../interfaces/equi';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EquiService {

  constructor( private http: Http) { 
  }

  getAll() : Observable<Equi[]>{
    return this.http.get("/assets/equi.json")
           .map(
              (res: Response) => res.json()
            )
  }

}
