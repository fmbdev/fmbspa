import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Parentesco } from '../interfaces/parentesco'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ParentescoService {

  constructor(private http: Http) { }

  getAll(): Observable<Parentesco[]>{
    return this.http.get("/assets/parentesco.json")
               .map(
                 (res: Response) => res.json()
               )
  }

}
