import { Component, OnInit } from '@angular/core';

import { PnnService } from './providers/pnn.service';
import { AuthService } from './providers/auth.service';
import { CampusNivelService } from './providers/campus-nivel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private pnnServ: PnnService, private authServ:AuthService, private campusNivelServ: CampusNivelService){}

  ngOnInit(){
    this.campusNivelServ.getAll();
    this.pnnServ.getAll(); 	
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
