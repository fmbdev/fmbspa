import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Tipificacion } from '../interfaces/tipificacion'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TipificacionService {

  constructor(private http: Http) { }

  getAll() : Observable<Tipificacion[]>{
    return this.http.get("/assets/tipificacion.json")
               .map(
                 (res: Response) => res.json()
               )
  }

}
