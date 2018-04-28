import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'; 
import { Nivel } from '../interfaces/nivel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class NivelService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Nivel[]>{
    return this.http.get("https://devmx.com.mx/fmbapp/public/api/nivel_estudios", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
