import { Component, OnInit } from '@angular/core';

import { PnnService } from './providers/pnn.service';
import { AuthService } from './providers/auth.service';
import { NivelService } from './providers/nivel.service';
import { CarreraService } from './providers/carrera.service';
import { ModalidadService } from './providers/modalidad.service';
import { CampusCarreraService } from './providers/campus-carrera.service';
import { SubsubtipoActividadService } from './providers/subsubtipo-actividad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private pnnServ: PnnService, 
              private authServ:AuthService,
              private nivelServ: NivelService,
              private carreraServ: CarreraService,
              private modalidadServ: ModalidadService,              
              private subSubServ: SubsubtipoActividadService,
              private campusCarreraServ: CampusCarreraService){}

  ngOnInit(){
    this.pnnServ.getAll();
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
        window.location.href="/";
      }
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

  onLogout() {
    this.authServ.logout();
  }
  
  onMenu(){
	  	if(localStorage.hello){
	  		var rick = JSON.parse(localStorage.hello);
	  		if(rick.msft){
	  		 	return "access_token";
	  		}else{
	  			return "no";
	  		}	  		
	  	}else{
	  		return "no";
	  	} 
 	}
}
