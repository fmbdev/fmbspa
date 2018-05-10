import { Component, OnInit,ViewChild } from '@angular/core';

import { CsqService } from './providers/csq.service';
import { PnnService } from './providers/pnn.service';
import { AuthService } from './providers/auth.service';
import { NivelService } from './providers/nivel.service';
import { CarreraService } from './providers/carrera.service';
import { ModalidadService } from './providers/modalidad.service';
import { CampusCarreraService } from './providers/campus-carrera.service';
import { SubsubtipoActividadService } from './providers/subsubtipo-actividad.service';
import { HomeService } from './providers/home.service';
import { LandingService } from './services/landing.service';
import {Router} from "@angular/router";

import {MatSidenav} from '@angular/material/sidenav';
 
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;
  shows:boolean = false;
  landings: any = [];

  constructor(
              private router: Router,
              private landingService: LandingService,
              private csqServ: CsqService,         
              private homeService: HomeService,
              private pnnServ: PnnService,              
              private authServ:AuthService,
              private nivelServ: NivelService,
              private carreraServ: CarreraService,
              private modalidadServ: ModalidadService,              
              private subSubServ: SubsubtipoActividadService,
              private campusCarreraServ: CampusCarreraService){}

  ngOnInit(){
    //this.landingService.getInit();    
    this.pnnServ.getAll();
    this.csqServ.getAll();
    this.nivelServ.getAll();
    this.carreraServ.getAll();
    this.modalidadServ.getAll();
    this.campusCarreraServ.getAll();
    let userLocal = localStorage.getItem('user');
    let datos = JSON.parse(userLocal);    
   // this.subsGetMe = this.homeService.getMe(  ).subscribe(me => this.meget = me);   
    
    console.log(datos);
    if(window.location.pathname!='/'){
      if(datos===null){
        this.homeService.getInit();  
         this.shows = false;

      }else{
         this.shows = true;
        $.ajax('https://devmx.com.mx/fmbapp/public/api/roles/'+datos.domainname,
        {
           //data: {user_id:''},
            contentType: 'application/json',
            type: 'GET',
            success: function(result) {
                console.log(result);
                let dat = JSON.stringify(result);                 
                this.landings = result; 
                localStorage.setItem('landings', dat);
            }
        });
     
      }
       let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
    }else{
     this.shows = true; 
      let userLanding = localStorage.getItem('landings');
      let land = JSON.parse(userLanding);  
       this.landings = land; 
    }
         	
  }

  /*onLogout() {
    //this.authServ.logout();
    /*this.sidenav.close();
    localStorage.clear();
    this.router.navigate(['/']);

  }
  
  onMenu(){
      /*if(window.location.pathname =='/' || window.location.pathname == '/home' || window.location.pathname == '/menu' ){
        return "no";
      }
	  	if(localStorage.access_token){
	  		 	return "access_token";
	  	}else{
	  		return "no";
	  	} 
 	}

   onGoto(url:string){
    this.sidenav.close();
    this.router.navigate([url]);
  }*/


}
