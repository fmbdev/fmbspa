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
  selector: 'app-new-register-promotion',
  templateUrl: './new-register-promotion.component.html',
  styleUrls: ['./new-register-promotion.component.scss']
})
export class NewRegisterPromotionComponent implements OnInit { 

  
  @ViewChild('subActivity') subActivity;
  @ViewChild('company') company;
  @ViewChild('subsubActivity') subsubActivity;
  @ViewChild('tourn') tourn;
  @ViewChild('school') school;


  @ViewChild('canal') canal;
  @ViewChild('csq') csq;
  @ViewChild('interes') interes;
  @ViewChild('name') name: ElementRef;
  @ViewChild('patern') patern: ElementRef;
  @ViewChild('matern') matern: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('mailRegis') mailRegis: ElementRef;
  @ViewChild('cel') cel: ElementRef;
  @ViewChild('phone') phone: ElementRef;
  @ViewChild('gender') gender;
  @ViewChild('birthday') birthday: ElementRef;
  @ViewChild('age') age: ElementRef;
  @ViewChild('interestCampus') interestCampus;
  @ViewChild('interestNivel') interestNivel;
  @ViewChild('citaCampus') citaCampus;
  @ViewChild('tipificacion') tipificacion;

  startDate = new Date(1990, 0, 1);
  user: any = {};
  send = false;
  inputError: any;
  txtError: any;
  
  matcher = new MyErrorStateMatcher();

  subActivityy =  new FormControl('', [Validators.required, this.validSubActivity.bind(this)]);
  companyy =      new FormControl('', [Validators.required, this.validCompany.bind(this)]);
  subsubActivityy = new FormControl('', [Validators.required, this.validSubsubActivity.bind(this)]);
  tournn =        new FormControl('', [Validators.required, this.validTourn.bind(this)]);
  schooll =       new FormControl('', [Validators.required, this.validSchool.bind(this)]);


  canall = new FormControl('', [Validators.required, this.validCanal.bind(this)]);
  csqq = new FormControl('', [Validators.required, this.validCsq.bind(this)]);
  interess = new FormControl('', [Validators.required, this.validInteres.bind(this)]);
  namee = new FormControl('', this.validName.bind(this));
  paternn = new FormControl('', this.validPatern.bind(this));
  maternn = new FormControl('', this.validMatern.bind(this));
  maill = new FormControl('', this.validMail.bind(this));
  cell = new FormControl('', this.validCel.bind(this));
  phonee = new FormControl('', this.validPhone.bind(this));
  genderr = new FormControl('', this.validGender.bind(this));
  birthdayy = new FormControl('', this.validBirthday.bind(this));
  agee = new FormControl('', this.validAge.bind(this));
  interestCampuss = new FormControl('', this.validInterestCampus.bind(this));
  interestNivell = new FormControl('', this.validInterestNivel.bind(this));
  citaCampuss = new FormControl('', this.validCitaCampus.bind(this));
  tipificacionn = new FormControl('', this.validTipificacion.bind(this));

  phoneRegiss = new FormControl('');
  phonerr = new FormControl('');
  userr = new FormControl('Ricardo Vargas');

  nameRegiss = new FormControl('');
  paternRegiss = new FormControl('');
  maternRegiss = new FormControl('');
  mailRegiss = new FormControl('');
  celRegiss = new FormControl('');
  notass = new FormControl('');


  nameTxtError: any = false;
  paternTxtError: any = false;
  maternTxtError: any = false;
  mailTxtError: any = false;
  mailRegisTxtError: any = false;

  //celTxtError: any = false;
  phoneTxtError: any = false;
  tipoTxtError: any = false;

  constructor(private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2) {
    this.user.subActivity = '0'; this.user.company = '0'; this.user.subsubActivity = '0'; this.user.tourn = '0'; this.user.school = '0';

    this.user.canal = '0'; this.user.interes = '0'; this.user.csq = '0'; this.user.parent = '0'; this.user.gender = '0';
    this.user.interestCampus = '0'; this.user.interestArea = '0'; this.user.interestNivel = '0'; this.user.interestModel = '0'; this.user.interestCareer = '0';
    this.user.interestCycle = '0'; this.user.citaCampus = '0'; this.user.citaAsesor = '0'; this.user.tipificacion = '0';
  }

  ngOnInit() {
  }

  addValidation(isChecked)
  {
    if(isChecked.checked){          
        this.maill.reset({value: '', disabled: true});        
    }else{
        this.maill.reset({value: '', disabled: false});        
        this.maill.setValidators(this.validMail.bind(this)); 
    } 
    this.maill.updateValueAndValidity(); 
  }
  onKeydownEmail(event: KeyboardEvent) {
    let name = this.nameRegiss.value;  
    console.log(name);              
    if(name==''){
         this.nameRegiss.clearValidators();
         this.paternRegiss.clearValidators();
         this.maternRegiss.clearValidators();
         this.mailRegiss.clearValidators();
    }else{
         this.nameRegiss.setValidators([Validators.required]);
         this.paternRegiss.setValidators([Validators.required]);
         this.maternRegiss.setValidators([Validators.required]);
         this.mailRegiss.setValidators([Validators.required,this.validMail2.bind(this)]);
    }
         this.nameRegiss.updateValueAndValidity();
         this.paternRegiss.updateValueAndValidity();
         this.maternRegiss.updateValueAndValidity();
         this.mailRegiss.updateValueAndValidity();
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
    if(this.send){
      return;
    }
    this.send = true;
    this.gralService.registerPromo(this.user).then((data) => {      
      this.send = false;
      if(data['success'] == false) {
        this.inputError =  data['input'];
        this.txtError = data['msg'];

        switch (data['input']) {

          case 'subActivity':
            this.subActivity.focus();
            this.subActivity.open();
            break;
          case 'company':
            this.company.focus();
            this.company.open();
            break;
          case 'subsubActivity':
            this.subsubActivity.focus();
            this.subsubActivity.open();
            break;
          case 'tourn':
            this.tourn.focus();
            this.tourn.open();
            break;
          case 'school':
            this.school.focus();
            this.school.open();
            break;

          case 'name':
            this.name.nativeElement.focus();
            break;
          case 'patern':
            this.patern.nativeElement.focus();
            break;
          case 'matern':
            this.matern.nativeElement.focus();
            break;
          case 'mail':
            this.mail.nativeElement.focus();
            break;
          case 'cel':
            this.cel.nativeElement.focus();
            break;
          case 'phone':
            this.phone.nativeElement.focus();
            break;
          case 'gender':
            this.gender.open();
            this.gender.focus();
            break;
          case 'birthday':
            this.birthday.nativeElement.focus();
            break;
          case 'age':
            this.age.nativeElement.focus();
            break;
          case 'mailRegis':
            this.mailRegis.nativeElement.focus();
            break;

          case 'canal':
            this.canal.focus();
            this.canal.open();
            break;
          case 'csq':
            this.csq.focus();
            this.csq.open();
            break;
          case 'interes':
            this.interes.open();
            this.interes.focus();
            break;
         
          case 'interestCampus':
            this.interestCampus.open();
            this.interestCampus.focus();
            break;
          case 'interestNivel':
            this.interestNivel.open();
            this.interestNivel.focus();
            break;
          case 'citaCampus':
            this.citaCampus.open();
            this.citaCampus.focus();
            break;
          case 'tipificacion':
            this.tipificacion.open();
            this.tipificacion.focus();
            break;
          default:
        }

        /*const dialogRef = this.dialog.open(ModalConfirmComponent, {
          minWidth: '50%',
          data: { type: 'warning', content: data['msg'] }
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            console.log('The dialog was closed', result);
          }
        });*/
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
          case 'mailRegis':
            this.mailRegisTxtError = data['msg'];
            break;         
          case 'phone':
            this.phoneTxtError = data['msg'];
            break;
          case 'tipo':
            this.tipoTxtError = data['msg'];
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
          case 'mailRegis':
            this.mailRegisTxtError = false;
            break;        
          case 'phone':
            this.phoneTxtError = false;
            break;
          case 'tipo':
            this.tipoTxtError = false;
            break;         
        }
        control.setErrors(null);
        return null;
      }
    });
  }

  validSubActivity(control: FormControl){
    if(this.user.subActivity == '0'){return {'error': true};}
    return null;
  }
  validCompany(control: FormControl){
    if(this.user.company == '0'){return {'error': true};}
    return null;
  }
  validSubsubActivity(control: FormControl){
    if(this.user.subsubActivity == '0'){return {'error': true};}
    return null;
  }
  validTourn(control: FormControl){
    if(this.user.tourn == '0'){return {'error': true};}
    return null;
  }
  validSchool(control: FormControl){
    if(this.user.school == '0'){return {'error': true};}
    return null;
  }


  validCsq(control: FormControl){
    if(this.user.csq == '0'){return {'error': true};}
    return null;
  }

  validCanal(control: FormControl){
    if(this.user.canal == '0'){return {'error': true};}
    return null;
  }

  validInteres(control: FormControl){
    if(this.user.interes == '0'){return {'error': true};}
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

  validMail2(control: FormControl){
    if(control.value){
      return this.serviceValidInput('mailRegis', 'mailRegis', control.value, control);
    }
    if(this.inputError == 'mailRegis'){return {'error': true};}
    return null;
  }

  validCel(control: FormControl){
    if(this.inputError == 'cel'){return {'error': true};}
    return null;
  }

  validPhone(control: FormControl){
    if(this.inputError == 'phone'){return {'error': true};}
    return null;
  }

  validGender(control: FormControl){
    if(this.user.gender == '0'){return {'error': true};}
    return null;
  }

  validBirthday(control: FormControl){
    if(this.inputError == 'birthday'){return {'error': true};}
    return null;
  }

  validAge(control: FormControl){
    if(this.inputError == 'age'){return {'error': true};}
    return null;
  }

  validInterestCampus(control: FormControl){
    if(this.user.interestCampus == '0'){return {'error': true};}
    return null;
  }

  validInterestNivel(control: FormControl){
    if(this.user.interestNivel == '0'){return {'error': true};}
    return null;
  }

  validCitaCampus(control: FormControl){
    if(this.user.citaCampus == '0'){return {'error': true};}
    return null;
  }

  validTipificacion(control: FormControl){
    if(this.user.tipificacion == '0'){return {'error': true};}
    return null;
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

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
