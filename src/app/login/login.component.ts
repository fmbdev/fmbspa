import { AppConfig } from './../services/constants';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {GeneralService} from '../services/general.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';
import * as $ from 'jquery';
import {Router} from "@angular/router";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  user: any = {};
  send = false;
  inputError: any;
  txtError: any;
  email: any;
  api_cnn;

  matcher = new MyErrorStateMatcher();
  
  private headers = new Headers({'Content-Type':'application/jsonp'});

  constructor(private router: Router,private gralService: GeneralService, public dialog: MatDialog, private authService: AuthService,private http: Http, public constante: AppConfig,
  public elementRef: ElementRef) { }

  ngOnInit() {
    this.email = new FormControl('', this.validUsuario.bind(this));
    console.log('CODE='+this.getParameterByName('code'));
    if(this.getParameterByName('code')!=''){
      window.location.href = "https://devmx.com.mx/fmbapp/public/api/getToken?code="+this.getParameterByName('code');
    }

    if(this.getParameterByName('access_token')!=''){
        let userLocal = localStorage.setItem('access_token',this.getParameterByName('access_token'));
        console.log('creando Access_token');
        /*var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/systemusers?$select=fullname&$filter=contains(fullname,'ana')",
            "method": "GET",
            "headers": {
              "authorization": "Bearer "+localStorage.getItem('access_token'),
              "content-type": "application/json",
              "odata.metadata": "minimal",              
            }
          }

          $.ajax(settings).done(function (response) {
            console.log(response);
          });*/

          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/WhoAmI",
            "method": "GET",
            "headers": {
              "authorization": "Bearer "+localStorage.getItem('access_token'),
              "content-type": "application/json",
              "odata.metadata": "minimal",              
            }
          }
          let old = this;
          $.ajax(settings).done(function (response){            
            let WhoAmI = JSON.stringify(response)
            localStorage.setItem('WhoAmI',WhoAmI) 

            let w = localStorage.getItem('WhoAmI');
            let k = JSON.parse(w);
            localStorage.setItem('UserId',k.UserId);
                   
            let UserId = localStorage.getItem('UserId');


                var settings2 = {
                  "async": true,
                  "crossDomain": true,
                  "url": "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/systemusers("+k.UserId+")",
                  "method": "GET",
                  "headers": {
                    "authorization": "Bearer "+localStorage.getItem('access_token'),
                    "content-type": "application/json",
                    "odata.metadata": "minimal",              
                  }
                }

                $.ajax(settings2).done(function (response){            
                  let user = JSON.stringify(response)
                  localStorage.setItem('user',user); 
                  $.ajax('https://devmx.com.mx/fmbapp/public/api/roles/'+response.domainname,
                    {
                       //data: {user_id:''},
                        contentType: 'application/json',
                        type: 'GET',
                        success: function(result) {
                            console.log(result);
                            let dat = JSON.stringify(result);                 
                            this.landings = result; 
                            localStorage.setItem('landings', dat);
                            old.onGoto('/home');
                        }
                    }); 

                   
                });
          });          
    }
  }

  

  validUsuario(control: FormControl){
    console.log(this.inputError);
    if(this.inputError == 'username'){
      return {'error': true};
    }

    return null;
  }
 
  onLogin() {
    //window.location.href = "https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/authorize?client_id=8b121322-84ec-4bb9-8929-6c64333775f6&response_type=code&redirect_uri=https://app.devmx.com.mx&response_mode=query&resource=https://laulatammxqa.crm.dynamics.com";
    window.location.href = "https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/authorize?client_id=8b121322-84ec-4bb9-8929-6c64333775f6&response_type=code&redirect_uri="+this.constante.api_request+"&response_mode=query&resource=https://laulatammxqa.crm.dynamics.com";
  }

  onLogin2() {
     
  }

  getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }

  


}
