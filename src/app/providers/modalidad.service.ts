import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Modalidad } from '../interfaces/modalidad';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ModalidadService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(): Observable<Modalidad[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/modalidad", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
