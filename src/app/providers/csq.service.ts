import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Csq } from '../interfaces/csq';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CsqService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor( private http: Http) {}

  getAll() : Observable<Csq[]>{
    return this.http.get("https://devmx.com.mx/fmbapp/public/api/csq", {headers: this.headers})
           .map(
              (res: Response) => res.json()
            )
  }

}
