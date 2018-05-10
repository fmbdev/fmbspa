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
  
  constructor(private pnnServ: PnnService,
              private csqServ: CsqService,
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

    /*if(window.location.pathname!='/'){
      if(localStorage.hello){
        var rick = JSON.parse(localStorage.hello);
        if(rick.msft){
           return "access_token";
        }else{
          window.location.href="/";
        }        
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
      if(localStorage.hello){
        var rick = JSON.parse(localStorage.hello);
        if(rick.msft){
          window.location.href="/home";
        }else{
          //cargara
        }        
      }else{
        //cargara
      }
    }*/
     	
  }

  /*onLogout() {
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
  }*/


}
