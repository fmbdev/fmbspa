import { Component, OnInit } from '@angular/core';

import { PnnService } from './providers/pnn.service';
import { CampusNivelService } from './providers/campus-nivel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private pnnServ: PnnService,
              private campusNivelServ: CampusNivelService){}

  ngOnInit(){
    this.campusNivelServ.getAll();
    this.pnnServ.getAll();
  }
}
