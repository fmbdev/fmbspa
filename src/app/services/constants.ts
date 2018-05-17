import { Injectable } from '@angular/core';

Injectable()
export class AppConfig{
  API_URL_PROD = 'http://devmx.com.mx/fmbapp/public/api/';
  API_URL_DEV = 'http://devmx.com.mx/fmbapp/public/api/';
  API_URL_DEBUG = "http://localhost:4200/fmbapp/public/api/";
  API_DEBUG = "http://localhost:4200/";

  public api_request = this.API_URL_DEV;
  
}
