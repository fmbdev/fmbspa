import { Component, OnInit,OnDestroy } from '@angular/core';
import { LandingService } from '../services/landing.service';

import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"

import { HomeService } from '../providers/home.service';
import { AuthService } from '../providers/auth.service';

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
    private authService: AuthService) { }

  ngOnInit() {
    this.landingService.getInit();         
    this.subsGetMe = this.homeService.getMe().subscribe(me => this.me = me);     
    console.log(this.me);   
  }

  ngOnDestroy() {
    this.subsGetUsers.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login();
  }

}
