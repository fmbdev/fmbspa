import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { LandingService } from '../services/landing.service';
import { LandingValidation } from '../validations/landing.validations';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;

  constructor(  private fb: FormBuilder,
    private landingService: LandingService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        LandingValidation.emailExistValidator(this.landingService)
      ]
    });
  }

}
