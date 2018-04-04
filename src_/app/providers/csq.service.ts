import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Csq } from '../interfaces/csq';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CsqService {

  constructor( private http: Http) { 
  }

  getAll() : Observable<Csq[]>{
    return this.http.get("/assets/csq.json")
           .map(
              (res: Response) => res.json()
            )
  }

}
