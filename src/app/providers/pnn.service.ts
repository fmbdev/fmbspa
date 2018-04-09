import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Pnn } from '../interfaces/pnn';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PnnService {

  private headers = new Headers({'Content-Type':'application/json'});
  private pnns: Pnn[] = [];

  constructor(private http: Http) { }

  getAll() {
    this.http.get("http://localhost:8000/api/pnn", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
               .subscribe(
                (data: Pnn[]) => this.pnns = data
               )
  }

  checkPnnIsValid(value: string) : boolean {
    let serie = value.substr(0,6);
    let serie_ni_nf = value;
    let isValid: boolean = false;

    for(let i = 0; i < this.pnns.length; i++){
      if(serie == this.pnns[i]._serie){
         let numeracion_inicial = serie+""+this.pnns[i].numeracion_inicial;
         let numeracion_final = serie+""+this.pnns[i].numeracion_final;
         if(serie_ni_nf == numeracion_inicial || serie_ni_nf == numeracion_final){
           isValid = true; 
           break;
         }
      }
    }
    return isValid;
    
  }
}
