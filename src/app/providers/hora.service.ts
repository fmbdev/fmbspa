import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Hora } from '../interfaces/hora';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HoraService {

  constructor( private http: Http) { 
  }

  getAll() : Observable<Hora[]>{
    return this.http.get("https://app.devmx.com.mx/assets/hora.json")
           .map(
              (res: Response) => res.json()
            )
  }

}