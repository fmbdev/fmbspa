import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UsuarioService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Usuario[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/usuario", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
