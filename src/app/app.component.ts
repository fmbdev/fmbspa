import { Component, OnInit,ViewChild } from '@angular/core';

import { PnnService } from './providers/pnn.service';
import { AuthService } from './providers/auth.service';
import { CampusNivelService } from './providers/campus-nivel.service';
import { ModalidadService } from './providers/modalidad.service';
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
              private homeService: HomeService,
              private pnnServ: PnnService, 
              private authServ:AuthService, 
              private modalidadServ: ModalidadService,
              private campusNivelServ: CampusNivelService,
              private subSubServ: SubsubtipoActividadService){}

  ngOnInit(){
    this.landingService.getInit();    
    this.pnnServ.getAll(); 
    this.campusNivelServ.getAll();
    this.modalidadServ.getModalidadNivel();
    this.subSubServ.getSubSubTiposActividad();

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

  onLogout() {
    //this.authServ.logout();
    this.sidenav.close();
    localStorage.clear();
    this.router.navigate(['/']);

  }
  
  onMenu(){
      if(window.location.pathname =='/' || window.location.pathname == '/home' || window.location.pathname == '/menu' ){
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
  }


}
