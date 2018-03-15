import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Palabramala } from '../interfaces/palabramala';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class PalabramalaService {

  constructor(private http: Http) { }

  getAll(): Observable<Palabramala[]>{
    return this.http.get("/assets/palabras_basura.json")
           .map(
              (data: Response) => data.json()
           )
  }
}
