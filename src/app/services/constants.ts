import { Injectable } from '@angular/core';

Injectable()
export class AppConfig{
  API_URL_PROD = 'http://devmx.com.mx/fmbapp/public/api/';
  API_URL_DEV = 'http://devmx.com.mx/fmbapp/public/api/';
  API_URL_DEBUG = "http://localhost/unitec-back/public/api/";
  API_DEBUG = "http://localhost:4200/";

  // configuración de tiempo de inactividad del usuario para cerrar sesión //
  // Este se ingresa en cantidad de minutos de espera //
  IldleWaiting:number  = 10; 

  public api_request = this.API_URL_DEV;
  public api_back = this.API_URL_PROD;
  
}
