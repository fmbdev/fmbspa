import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Canal } from '../interfaces/canal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class CanalService {

  constructor(private http: Http) { }

  getAll(): Observable<Canal[]>{
    return this.http.get("/assets/canal.json")
           .map(
              (data: Response) => data.json()
           )
  }
}
