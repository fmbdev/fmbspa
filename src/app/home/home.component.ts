import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private landingService: LandingService,) { }

  ngOnInit() {
    this.landingService.getPalabrasMalas();
  }

}
