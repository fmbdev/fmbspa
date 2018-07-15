import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Location } from '@angular/common';

import * as $ from 'jquery';
import {Router} from "@angular/router";
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  displayedColumns = ['selected', 'numberA', 'id', 'name', 'interest', 'mail', 'last'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  reesults: any;
  cantidad: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,private location: Location) {
  }

  ngOnInit() {
   
      let h = JSON.parse(localStorage.getItem('search_value'));
      this.cantidad = h.length;
      this.reesults  = h;   
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  showLead(values: any) {
    console.log(values.source.value);
    localStorage.setItem('lead_id', values.source.value);
  }
  
  seleccionarLead(){
    let useLead = localStorage.getItem('lead_id');
    let go = this;
    let urlGetLEad = "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/leads?$filter=leadid eq " + useLead;
    var settings2 = {
      "async": true,
      "crossDomain": true,
      "url": urlGetLEad,
      "method": "GET",
      "headers": {
        "authorization": "Bearer " + localStorage.getItem('access_token'),
        "content-type": "application/json",
        "odata.metadata": "minimal",
      }
    }

    $.ajax(settings2).done(function (response) {
      const user = JSON.stringify(response);
      const fuente = response.value[0].crmit_fuenteobtencionname;
      localStorage.setItem('lead_user', user);
      if(fuente=='SOLOVINOS'){
         go.onGoto('/register-existing-solo');
      }else if(fuente=='INBOUND'){
        go.onGoto('/register-existing');
     }
    });
  }
  
}


export interface Element {
  name: string;
  numberA: number;
  id: number;
  interest: string;
  mail: string;
  last: string;
  selected: boolean;
}
