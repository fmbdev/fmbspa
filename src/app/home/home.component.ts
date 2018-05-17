import { Component, OnInit,OnDestroy } from '@angular/core';
import { LandingService } from '../services/landing.service';

import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as $ from 'jquery';

import { HomeService } from '../providers/home.service';
import { AuthService } from '../providers/auth.service';
import {Router} from "@angular/router";
import { ModalidadService } from '../providers/modalidad.service';
import { PnnService } from './../providers/pnn.service';
import { CampusCarreraService } from './../providers/campus-carrera.service';
import { AppConfig } from './../services/constants';

import { Landing } from '../interfaces/landing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  events: MicrosoftGraph.Event[];
  meget: MicrosoftGraph.User;
  me: MicrosoftGraph.User;
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
    public constante: AppConfig,
    public campusCarreraServ: CampusCarreraService, 
    public pnnServ: PnnService,
    private router: Router) { }

  ngOnInit() {
    
    
    //this.homeService.getInit();   

    let userLocal = localStorage.getItem('user');
    let datos = JSON.parse(userLocal);  

       
    
    console.log(datos);
    let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
    if(datos===null){
     this.homeService.getInit();
     setTimeout(()=>{    
        window.location.href='/home';
     },400);
     // window.location.href='/home';
     let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
    }else{
      let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
      this.show = true;
    }
    console.log(this.landings);
    
    this.me = datos; 
    this.campusCarreraServ.getAll();
    this.pnnServ.getAll();
  
  }

  ngOnDestroy() {
    // this.subsGetUsers.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login();
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }
}
