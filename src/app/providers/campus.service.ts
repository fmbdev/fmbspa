import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Campus } from '../interfaces/campus';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CampusService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(): Observable<Campus[]>{
    return this.http.get("https://devmx.com.mx/fmbapp/public/api/campus", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
