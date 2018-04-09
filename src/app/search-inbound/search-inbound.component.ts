import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {GeneralService} from '../services/general.service';
import {MatDialog, MatSelect} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-search-inbound',
  templateUrl: './search-inbound.component.html',
  styleUrls: ['./search-inbound.component.scss']
})
export class SearchInboundComponent implements OnInit { 
  
  
  @ViewChild('numPerson') numPerson: ElementRef;
  @ViewChild('numAcount') numAcount: ElementRef;

  @ViewChild('mail') mail: ElementRef;
  @ViewChild('mailTutor') mailTutor: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('patern') patern: ElementRef;
  @ViewChild('matern') matern: ElementRef;
  @ViewChild('phone') phone: ElementRef;

  user: any = {};
  send = false;
  inputError: any;
  txtError: any;

  matcher = new MyErrorStateMatcher();

  numPersonn  = new FormControl('', this.validNumPerson.bind(this));
  numAcountt  = new FormControl('', this.validNumAcount.bind(this));

  maill = new FormControl('', this.validMail.bind(this));
  mailTutorr = new FormControl('', this.validMailTutor.bind(this));

  namee = new FormControl('', [this.validName.bind(this)]);
  paternn = new FormControl('', [this.validPatern.bind(this)]);
  maternn = new FormControl('', [this.validMatern.bind(this)]);
  phonee = new FormControl('', [this.validPhone.bind(this)]);
  
  numPersonTxtError: any = false;
  numAcountTxtError: any = false;

  nameTxtError: any = false;
  paternTxtError: any = false;
  maternTxtError: any = false;
  mailTxtError: any = false;
  mailTutorTxtError: any = false;
  phoneTxtError: any = false;
  tipoTxtError: any = false;


  constructor(private gralService: GeneralService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  _keyOnly3letter(event:any, name:any){
      const only3letter = /a{3,10}|b{3,10}|c{3,10}|d{3,10}|e{3,10}|f{3,10}|g{3,10}|h{3,10}|i{3,10}|j{3,10}|k{3,10}|l{3,10}|m{3,10}|n{3,10}|o{3,10}|p{3,10}|q{3,10}|w{3,10}|r{3,10}|s{3,10}|t{3,10}|u{3,10}|v{3,10}|w{3,10}|x{3,10}|y{3,10}|z{3,10}/;      
      if(only3letter.test(name)){        
        event.preventDefault();        
        return false;    
      } else{        
        return true;
      }
  }
  save() {
    console.log(this.user);
    if(this.send){
      return;
    }
    this.send = true;

    this.gralService.searchInbound(this.user).then((data) => {
      console.log(data['msg']);
      this.send = false;

      if(data['success'] == false) {
        this.inputError =  data['input'];
        this.txtError = data['msg'];

        switch (data['input']) {
          case 'mail':
            this.mail.nativeElement.focus();
            break;
          case 'mailTutor':
            this.mailTutor.nativeElement.focus();
            break;
          default:
        }

      }
    }, (err) => {
      console.warn(err);
      this.send = false;
    });
  }
  serviceValidInput(type, input, value, control){
    return this.gralService.validInput({type: type, data: value}).then((data) => {
      if(data['success'] == false) {
        this.inputError = input;
        this.txtError = data['msg'];
        switch(input) {
          case 'name':
            this.nameTxtError = data['msg'];
            break;
          case 'patern':
            this.paternTxtError = data['msg'];
            break;
          case 'matern':
            this.maternTxtError = data['msg'];
            break;
          case 'mail':
            this.mailTxtError = data['msg'];
            break;          
          case 'phone':
            this.phoneTxtError = data['msg'];
            break;
          case 'mailTutor':
            this.mailTutorTxtError = data['msg'];
            break; 
        }
        return {'error': true};
      }else{
        this.inputError =  null;
        this.txtError = null;
        switch(input) {
          case 'name':
            this.nameTxtError = false;
            break;
          case 'patern':
            this.paternTxtError = false;
            break;
          case 'matern':
            this.maternTxtError = false;
            break;
          case 'mail':
            this.mailTxtError = false;
            break;         
          case 'phone':
            this.phoneTxtError = false;
            break;
          case 'mailTutor':
            this.mailTutorTxtError = false;  
        }
        control.setErrors(null);
        return null;
      }
    });
  }
  validMailTutor(control: FormControl){
    if(this.inputError == 'mailTutor'){return {'error': true};}
    return null;
  }

  validName(control: FormControl){
    if(control.value){
      return this.serviceValidInput('name', 'name', control.value, control);
    }
    if(this.inputError == 'name'){return {'error': true};}
    return null;
  }

  validPatern(control: FormControl){
    if(control.value){
      return this.serviceValidInput('patern', 'patern', control.value, control);
    }
    if(this.inputError == 'patern'){return {'error': true};}
    return null;
  }

  validMatern(control: FormControl){
    if(control.value){
      return this.serviceValidInput('matern', 'matern', control.value, control);
    }
    if(this.inputError == 'matern'){return {'error': true};}
    return null;
  }

  validMail(control: FormControl){
    if(control.value){
      return this.serviceValidInput('mail', 'mail', control.value, control);
    }
    if(this.inputError == 'mail'){return {'error': true};}
    return null;
  }
  

  validPhone(control: FormControl){
    if(control.value){
      return this.serviceValidInput('phone', 'phone', control.value, control);
    }
    if(this.inputError == 'phone'){return {'error': true};}
    return null;
  }

  validNumAcount(control: FormControl){
    if(control.value){
      return this.serviceValidInput('numAcount', 'numAcount', control.value, control);
    }
    if(this.inputError == 'numAcount'){return {'error': true};}
    return null;
  }

  validNumPerson(control: FormControl){
    if(control.value){
      return this.serviceValidInput('numPerson', 'numPerson', control.value, control);
    }
    if(this.inputError == 'numPerson'){return {'error': true};}
    return null;
  }


  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  _keyPressTxt(event: any) {
    const pattern = /[a-zA-Z\ñ\Ñ\ ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
