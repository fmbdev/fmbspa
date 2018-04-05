import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

@Injectable()
export class LandingService {
  constructor(private http: HttpClient) { }
  checkPalabra(email: string) {
    return this.http
      .get('assets/users.json')       
      .map((res:any) => res.json())
      .map(users => users.filter(user => user.email === email))
      .map(users => !users.length);
  }
}