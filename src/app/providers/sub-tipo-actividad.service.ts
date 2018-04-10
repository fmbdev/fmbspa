import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { SubTipoActividad } from '../interfaces/sub-tipo-actividad';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SubTipoActividadService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<SubTipoActividad[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/sub_tipo_actividad", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
