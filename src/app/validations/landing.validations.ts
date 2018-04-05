import { AbstractControl } from '@angular/forms';
import { LandingService } from '../services/landing.service';

export class LandingValidation {
  static emailExistValidator(landingService: LandingService) {
    return (control: AbstractControl) => {
      return landingService.checkPalabra(control.value).map(res => {
        return res ? null : { emailTaken: true };
      });
    };
  }
}