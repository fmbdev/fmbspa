import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { SubTipo } from '../interfaces/sub-tipo';
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SubsubtipoActividadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private subTipo: SubTipo[] = [];
  private subSubTipo: SubsubTipo[] = [];
  
  constructor(private http: Http) { }

  getSubSubTiposActividad(){
    this.http.get("https://devmx.com.mx/fmbapp/public/api/subsubtipo_actividad", {headers: this.headers})
        .map(
          (res: Response) => res.json
        )
        .subscribe(
          (data: any) => {
            console.log(data);
          }
        )
  }

}
