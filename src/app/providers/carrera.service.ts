import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Carrera } from '../interfaces/carrera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CarreraService {

  private headers = new Headers({'Content-Type':'application/json'});
  private carreras: Carrera[] = [];
  api_cnn;

  constructor(private http: Http, private constante: AppConfig) {
    this.api_cnn =  this.constante.api_request; 
   }

  getAll() {
    this.http.get(this.api_cnn+"carrera", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Carrera[]) => this.carreras = data
        )
  }

  getCarreras(): Carrera[]{
    return this.carreras;
  }

}
