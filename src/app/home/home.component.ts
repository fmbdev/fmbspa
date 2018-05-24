import { UsuarioService } from './../providers/usuario.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LandingService } from '../services/landing.service';

import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as $ from 'jquery';

import { HomeService } from '../providers/home.service';
import { AuthService } from '../providers/auth.service';
import {Router} from "@angular/router";
import { ModalidadService } from '../providers/modalidad.service';
import { PnnService } from './../providers/pnn.service';
import { CampusCarreraService } from './../providers/campus-carrera.service';
import { AppConfig } from './../services/constants';

import { Landing } from '../interfaces/landing';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  events: MicrosoftGraph.Event[];
  meget: MicrosoftGraph.User;
  me: MicrosoftGraph.User;
  message: MicrosoftGraph.Message;
  emailSent: Boolean;
  subsGetUsers: Subscription;
  subsGetMe: Subscription;
  subsSendMail: Subscription;
  show:boolean = false;
  
  landings: any = [];

  constructor(
  	private landingService: LandingService,  
  	private homeService: HomeService,
    private authService: AuthService,
    private modalidadServ: ModalidadService,
    public constante: AppConfig,
    public campusCarreraServ: CampusCarreraService, 
    public pnnServ: PnnService,
    private router: Router, 
    private usrService: UsuarioService ) { 
      window.onpopstate = function (event) {
        //history.go(1);
        console.log('le puchaste back o go')
      }
    }

  ngOnInit() {
    let value = {"@odata.context":"https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/$metadata#systemusers/$entity","@odata.etag":"W/\"3209755\"","systemuserid":"ad33d6a8-c189-e711-8104-5065f38b3241","accessmode":0,"firstname":"User","address2_shippingmethodcode":1,"issyncwithdirectory":true,"azureactivedirectoryobjectid":"41d4fafc-8426-4728-aa09-2abda62ad3f8","incomingemaildeliverymethod":2,"internalemailaddress":"crmuser.director1@laureate.mx","domainname":"crmUser.Director1@laureate.mx","_queueid_value":"b233d6a8-c189-e711-8104-5065f38b3241","isintegrationuser":false,"createdon":"2017-08-25T18:17:36Z","address1_postalcode":"52970","_calendarid_value":"78180d44-072a-4707-9f33-4b78d1c6e048","windowsliveid":"crmUser.Director1@laureate.mx","address1_addresstypecode":1,"_businessunitid_value":"0a0f4972-2d4a-e811-8110-3863bb2e1360","invitestatuscode":4,"defaultodbfoldername":"CRM","address1_line1":"Blvd. Calacoaya No. 7 Col. La Ermita","modifiedon":"2018-05-02T03:52:59Z","address1_shippingmethodcode":1,"defaultfilterspopulated":false,"outgoingemaildeliverymethod":2,"address1_composite":"Blvd. Calacoaya No. 7 Col. La Ermita\r\n52970 Estado de Mexico, Mexico State\r\nMX","emailrouteraccessapproval":2,"versionnumber":3209755,"address2_addresstypecode":1,"preferredphonecode":1,"fullname":"User Director1","setupuser":false,"preferredemailcode":1,"userlicensetype":6,"_modifiedby_value":"6912b0c8-c189-e711-8104-5065f38b3241","displayinserviceviews":false,"organizationid":"43761281-d129-4c9e-a404-1461887cbe79","lastname":"Director1","isemailaddressapprovedbyo365admin":false,"caltype":7,"yomifullname":"User Director1","isdisabled":false,"address1_city":"Estado de Mexico","address2_addressid":"a0148aba-1054-4dd3-8754-78a04799aec8","_defaultmailbox_value":"b133d6a8-c189-e711-8104-5065f38b3241","address1_country":"MX","preferredaddresscode":1,"address1_addressid":"6498146e-da9b-4239-91eb-30658a8e1955","islicensed":true,"address1_stateorprovince":"Mexico State","ownerid":"ad33d6a8-c189-e711-8104-5065f38b3241","crmit_tipoaccesodecorreoelectrnicoentrante":null,"_crmit_rolusuario_value":null,"_createdby_value":null,"nickname":null,"crmit_estadocarrusel":null,"address2_stateorprovince":null,"crmit_asesordisponible":null,"crmit_correoelectrnicoprincipal":null,"applicationiduri":null,"address1_county":null,"address2_country":null,"address2_postofficebox":null,"yammeruserid":null,"title":null,"employeeid":null,"_territoryid_value":null,"jobtitle":null,"skills":null,"_crmit_administrador_value":null,"_crmit_modalidadid_value":null,"address2_composite":null,"entityimage":null,"crmit_modoacceso":null,"_crmit_equipousarioid_value":null,"address1_line3":null,"disabledreason":null,"address2_utcoffset":null,"address1_line2":null,"_crmit_unidadnegocioid_value":null,"personalemailaddress":null,"address1_telephone2":null,"_createdonbehalfby_value":null,"crmit_limiteoportunidades":null,"address1_longitude":null,"sharepointemailaddress":null,"yomifirstname":null,"exchangerate":null,"_crmit_equipoautorizadorid_value":null,"_crmit_directorid_value":null,"yomimiddlename":null,"crmit_tipolicencia":null,"address2_line2":null,"address1_telephone1":null,"traversedpath":null,"_crmit_areaatencionid_value":null,"yomilastname":null,"address2_latitude":null,"mobilephone":null,"address2_fax":null,"crmit_clavecisco":null,"_crmit_campusid_value":null,"address1_latitude":null,"_crmit_rolprincipalid_value":null,"entityimage_timestamp":null,"crmit_correoelectronico2":null,"photourl":null,"_siteid_value":null,"_transactioncurrencyid_value":null,"passportlo":null,"_mobileofflineprofileid_value":null,"address1_name":null,"address2_telephone2":null,"_parentsystemuserid_value":null,"crmit_clavepresupuestal":null,"crmit_clavepresupuestalplaza":null,"stageid":null,"address2_longitude":null,"crmit_usuariogeneracitasprospeccion":null,"salutation":null,"yammeremailaddress":null,"address2_city":null,"middlename":null,"entityimageid":null,"address2_county":null,"address2_line1":null,"address2_upszone":null,"address1_utcoffset":null,"crmit_tipoaccesocorreoelectronicosaliente":null,"_positionid_value":null,"passporthi":null,"crmit_noempleado":null,"crmit_areaasignacion":null,"_crmit_nivelestudiosid_value":null,"crmit_titulo":null,"address1_telephone3":null,"address2_postalcode":null,"address2_telephone1":null,"entityimage_url":null,"processid":null,"governmentid":null,"_modifiedonbehalfby_value":null,"address2_line3":null,"utcconversiontimezonecode":null,"homephone":null,"crmit_team":null,"address2_name":null,"overriddencreatedon":null,"address1_upszone":null,"importsequencenumber":null,"crmit_equipocomercial":null,"_crmit_planestudiosid_value":null,"mobilealertemail":null,"address1_fax":null,"crmit_colapredeterminada":null,"address2_telephone3":null,"address1_postofficebox":null,"crmit_settings":null,"timezoneruleversionnumber":null,"applicationid":null};
    localStorage.setItem('user', JSON.stringify(value) );
    
    localStorage.setItem('UserId', 'ad33d6a8-c189-e711-8104-5065f38b3241' );
    let valwhoami = JSON.stringify({"@odata.context":"https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse","BusinessUnitId":"0a0f4972-2d4a-e811-8110-3863bb2e1360","UserId":"ad33d6a8-c189-e711-8104-5065f38b3241","OrganizationId":"43761281-d129-4c9e-a404-1461887cbe79"})
    //this.homeService.getInit();   

    let userLocal = localStorage.getItem('user');
    let datos = JSON.parse(userLocal);  
    localStorage.setItem('tipo_rol','UNTC Ejecutivo de Cuenta')

    localStorage.setItem('access_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImlCakwxUmNxemhpeTRmcHhJeGRacW9oTTJZayIsImtpZCI6ImlCakwxUmNxemhpeTRmcHhJeGRacW9oTTJZayJ9.eyJhdWQiOiJodHRwczovL2xhdWxhdGFtbXhxYS5jcm0uZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzQ2YTFkMWQtZTc1Yi00NzUzLTkwMmItNzRlZDYwYWU3N2ExLyIsImlhdCI6MTUyNzE2Mjk5NCwibmJmIjoxNTI3MTYyOTk0LCJleHAiOjE1MjcxNjY4OTQsImFjciI6IjEiLCJhaW8iOiJBU1FBMi84SEFBQUEvU1Rra1VCT1Z5ZjJqYnJMM1VEVk8vRHRPVFd0enlWanNsbXBxZWV1OThNPSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI4YjEyMTMyMi04NGVjLTRiYjktODkyOS02YzY0MzMzNzc1ZjYiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IkRpcmVjdG9yMSIsImdpdmVuX25hbWUiOiJVc2VyIiwiaXBhZGRyIjoiMTg5LjIxNy4xMjIuODIiLCJuYW1lIjoiVXNlciBEaXJlY3RvcjEiLCJvaWQiOiI0MWQ0ZmFmYy04NDI2LTQ3MjgtYWEwOS0yYWJkYTYyYWQzZjgiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNDAwODg1MzM5MC0xNDgyNjA5NzEzLTkxMTc4NTE4NC0zMjUyNjQiLCJwdWlkIjoiMTAwMzAwMDBBNDY1Mzk4RSIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlU4bXFEMFd5Um5wd3VudWMtU0NCdjRjcFNGdkk5S3pHbzg5V25sYU84UGMiLCJ0aWQiOiIzNDZhMWQxZC1lNzViLTQ3NTMtOTAyYi03NGVkNjBhZTc3YTEiLCJ1bmlxdWVfbmFtZSI6ImNybVVzZXIuRGlyZWN0b3IxQGxhdXJlYXRlLm14IiwidXBuIjoiY3JtVXNlci5EaXJlY3RvcjFAbGF1cmVhdGUubXgiLCJ1dGkiOiJZMjU1OTYyU01reUwxNy1naDVsa0FBIiwidmVyIjoiMS4wIn0.bsu0n0Ma1R2jQ7Z4BRM2u9vY0oSiJ0yAgxHZX97ifGck63p6Bl9wkxFZL9EUWX13bX0eS_dtkKBeiyx4AlVPj1Ea35EZQsoRgiLKSb7_KOZsCheKSHp2A6CoNSsPdfoSFOLMhYpx9X10Aw4JQL8c42YBdqolDV7-PxV6PKYrjD81G1XH62BDKfRQadE7ZFK1j1g-JNBvPCuLHiqiIy2rhThkp7c2fAcri_fGB7aMS0A15NcWphpd7c8_kYOS9PLSOP77o-g3tG3-OSqJvS9kTZBi9FURSBxItEbnLXSrZYq5grD0fPQZq8ysAzESJp2YfXYmQDCq0VjHrhBT4yWGaw');
    // this.usrService.getRolUsuario(datos.windowsliveid).subscribe(res=>{
    //   localStorage.setItem('tipo_rol', res.rol_name );
    // });
    
    
    let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
    if(datos===null){
     this.homeService.getInit();
     setTimeout(()=>{    
        window.location.href='/home';
     },400);
     // window.location.href='/home';
     let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
    }else{
      let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);  
    this.landings = land; 
      this.show = true;
    }
    console.log(this.landings);
    
    this.me = datos; 
    this.campusCarreraServ.getAll();
    this.pnnServ.getAll();
  
  }

  ngOnDestroy() {
    // this.subsGetUsers.unsubscribe();
  }

  onLogout() {
    //this.authServ.logout();
    this.sidenav.close();
    localStorage.clear();
    this.router.navigate(['/']);

  }

  onLogin() {
    this.authService.login();
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }
}
