import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Modalidad } from '../interfaces/modalidad';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ModalidadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private modalidades: Modalidad[] = [];

  constructor(private http: Http) { }

  getAll() {
    this.http.get("https://devmx.com.mx/fmbapp/public/api/modalidad", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: any[]) => this.modalidades = data
        )          
  }

  getModalidades(): Modalidad[]{
    return this.modalidades; 
  }

}
