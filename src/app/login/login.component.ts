import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {GeneralService} from '../services/general.service';
import {MatDialog} from '@angular/material';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  user: any = {};
  send = false;
  inputError: any;
  txtError: any;
  email: any;

  matcher = new MyErrorStateMatcher();

  constructor(private gralService: GeneralService, public dialog: MatDialog) { }

  ngOnInit() {
    this.email = new FormControl('', this.validUsuario.bind(this));
  }

  validUsuario(control: FormControl){
    console.log(this.inputError);
    if(this.inputError == 'username'){
      return {'error': true};
    }

    return null;
  }

  login(){
    
    if(this.send){
      return;
    }

    this.send = true;

    this.gralService.login(this.user).then((data) => {
      console.log(data['msg']);
      this.send = false;

      this.inputError= null;
      this.txtError = null;

      if(data['success'] == false) {
        this.inputError =  data['input'];
        this.txtError = data['msg'];

        if(data['input'] == 'username'){
          this.usernameInput.nativeElement.focus();
        }else{
          this.passwordInput.nativeElement.focus();
        }

      }


    }, (err) => {
      console.warn(err);
      this.send = false;
    });
  }

}
