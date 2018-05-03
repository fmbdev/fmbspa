import { Component, OnInit,OnDestroy } from '@angular/core';
import { LandingService } from '../services/landing.service';

import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as $ from 'jquery';

import { HomeService } from '../providers/home.service';
import { AuthService } from '../providers/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  events: MicrosoftGraph.Event[];
  me: MicrosoftGraph.User;
  message: MicrosoftGraph.Message;
  emailSent: Boolean;
  subsGetUsers: Subscription;
  subsGetMe: Subscription;
  subsSendMail: Subscription;


  constructor(
  	private landingService: LandingService,  
  	private homeService: HomeService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.landingService.getInit();
    $.get("https://laulatammxdev.api.crm.dynamics.com/api/data/v8.2/WhoAmI", function (data) {
      localStorage.user = data;
    });
    this.subsGetMe = this.homeService.getMe().subscribe(me => this.me = me);     
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
