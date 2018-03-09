import { Component, OnInit } from '@angular/core';
import {FormControl,FormsModule, FormGroupDirective, NgForm} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'contact-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})



export class CreateContacComponent implements OnInit {
  foods = [
    {value: '', viewValue: 'Rosa'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() {}
 
  ngOnInit() {}

  onFormSubmit(){}

}