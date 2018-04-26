import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Pnn } from '../interfaces/pnn';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PnnService {

  private pnns: Pnn[] = [];
  private isValid: boolean;

  constructor(private http: Http) { }

  getAll() {
    this.http.get("/assets/pnnpublico.json")
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Pnn[]) => this.pnns = data
        )
  }

  checkPnnIsValid(value: string) : boolean {
    this.isValid = false;
    let serie = value.substr(0,6);

    for(let i = 0; i < this.pnns.length; i++){
      if(serie == this.pnns[i]._serie){
           this.isValid = true; 
         }
    }
    return this.isValid; 
  }

}


