import { Component, OnInit } from '@angular/core';

import { PnnService } from './providers/pnn.service';
import { AuthService } from './providers/auth.service';
import { CampusNivelService } from './providers/campus-nivel.service';
import { SubsubtipoActividadService } from './providers/subsubtipo-actividad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private pnnServ: PnnService, 
              private authServ:AuthService, 
              private campusNivelServ: CampusNivelService,
             private subSubServ: SubsubtipoActividadService){}

  ngOnInit(){
    this.pnnServ.getAll(); 
    this.campusNivelServ.getAll();
    this.subSubServ.getSubSubTiposActividad();

    if(window.location.pathname!='/'){
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
    }
     	
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
