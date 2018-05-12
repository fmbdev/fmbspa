import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Csq } from '../interfaces/csq';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CsqService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor( private http: Http) {}
  private csqs: Csq[] = [];

  getAll(){
    this.http.get("https://devmx.com.mx/fmbapp/public/api/csq", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Csq[]) => this.csqs = data     
        )
  }

  getCsqs() : Csq[]{
    return this.csqs;
  }

  getCsqsByCanal(canalId: string) : Csq[]{
    let csqsByCanales: Csq[] = [];
    this.getAll();    
    for(let i = 0; i < this.csqs.length; i++){
      if(this.csqs[i].canalId == canalId){
        csqsByCanales.push(this.csqs[i]);
      }
    }
    console.log(csqsByCanales);    
    return csqsByCanales;
  }

}
