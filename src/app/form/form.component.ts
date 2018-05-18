import { Component, OnInit,OnDestroy,ViewChild} from '@angular/core';
import { LandingService } from '../services/landing.service';

import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as $ from 'jquery';

import { HomeService } from '../providers/home.service';
import { AuthService } from '../providers/auth.service';
import {Router} from "@angular/router";
import { ModalidadService } from '../providers/modalidad.service';

import { Landing } from '../interfaces/landing';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  events: MicrosoftGraph.Event[];
  meget: MicrosoftGraph.User;
  me: any;
  message: MicrosoftGraph.Message;
  emailSent: Boolean;
  subsGetUsers: Subscription;
  subsGetMe: Subscription;
  subsSendMail: Subscription;
  show:boolean = false;
  
  landings: any = [];

  constructor(
    private landingService: LandingService,  
    private homeService: HomeService,
    private authService: AuthService,
    private modalidadServ: ModalidadService,
    private router: Router) { }

  ngOnInit() {
    
    
    //this.homeService.getInit();   

    let userLocal = localStorage.getItem('user');
    let datos = JSON.parse(userLocal);  

       
    
    console.log(datos);

    let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
    
    console.log(this.landings);
 
    
    this.me = datos; 
  
  }

  ngOnDestroy() {
    // this.subsGetUsers.unsubscribe();
  }

  onLogout() {
    //this.authServ.logout();
    this.sidenav.close();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  onLogin() {
    this.authService.login();
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }

}
