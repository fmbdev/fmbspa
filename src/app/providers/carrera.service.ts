import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Carrera } from '../interfaces/carrera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CarreraService {

  private headers = new Headers({'Content-Type':'application/json'});
  private carreras: Carrera[] = [];

  constructor(private http: Http) { }

  getAll(): Observable<Carrera[]>{
    return this.http.get("https://devmx.com.mx/fmbapp/public/api/carrera", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
               .do(
                 (data: Carrera[]) => this.carreras = data
               )
  }

  getCarreras(): Carrera[]{
    return this.carreras;
  }

}
