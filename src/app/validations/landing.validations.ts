import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LandingService } from '../services/landing.service';

export class LandingValidation {

  public palabraMal:string;

  constructor(){ }
  /* static emailExistValidator(landingService: LandingService) {
    return (control: AbstractControl) => {
      return landingService.checkPalabra(control.value).map(res => {
        return res ? null : { emailTaken: true };
      });
    };
  }*/

  static palabraMalaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const name = control.value;
      let array = localStorage.getBasuraObs;
      if (name=="") {        
        const texto = "orale";        
        return { 'palabraMala': { name } }
      }else if (array.indexOf(name)>-1) {
        return { 'palabraMala': { name } }
      }else{
        return null;
      }
    };
  }
}