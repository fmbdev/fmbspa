import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Interes } from '../interfaces/interes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class InteresService {

  constructor(private http: Http) { }

  getAll() : Observable<Interes[]>{
    return this.http.get("/assets/interes.json")
               .map(
                 (res: Response) => res.json()
               )
  }

}
