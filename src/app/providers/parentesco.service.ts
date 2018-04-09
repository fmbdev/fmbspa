import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Parentesco } from '../interfaces/parentesco'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ParentescoService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Parentesco[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/parentesco", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
