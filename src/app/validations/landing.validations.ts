import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LandingService } from '../services/landing.service';

export class LandingValidation {

  public palabraMal:string;

  constructor(){ }

  static palabraMalaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const name = control.value;
      let array = localStorage.getBasuraObs;
      if (name=="") {                     
        return { 'palabraMala': { name } }
      }else if (array.indexOf(name)>-1) {
        return { 'palabraMala': { name } }
      }else{
        return null;
      }
    };
  }
}