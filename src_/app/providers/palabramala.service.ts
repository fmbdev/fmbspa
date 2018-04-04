import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Palabramala } from '../interfaces/palabramala';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()

export class PalabramalaService {
  
  constructor(private http: Http) { }

  getAll(palabra:string): Observable<Palabramala[]>{
  	
  	let url="http://devmx.com.mx/fmbapp/public/api/malas-palabras/"+palabra;     

    return this.http.get(url)
           .map(
              (data: Response) => data.json()
           )
  }
}
