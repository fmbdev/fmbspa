import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SendService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  sendDataToApi(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/5641?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
