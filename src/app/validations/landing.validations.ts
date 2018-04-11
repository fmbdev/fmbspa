import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LandingService } from '../services/landing.service';
import { FormControl} from '@angular/forms';

export class LandingValidation {

    public palabraMal:string;
    
    constructor(){ }

    static palabraMalaValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {            
            const name = control.value;
            if(name!=""){
                let array = localStorage.getBasuraObs;
                if (array.indexOf(name) > -1) {
                    return { 'palabraMala': { name } }
                } else {
                    return null;
                }
            }            
            
        };
    }

    static requiredSelectValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {            
            const name = control.value;            
            if(name == ''){
                return { 'requiredSelect': { name } }
            }else{
                return null;
            }
        };
    }

    static emailMaloValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {            
            const name = control.value; 
            if (name!=""){
                if((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(name)){
                  return  null;
                }else{
                  return {'emailMalo': {name}}
                }   
            }
        };
    }

    static letterName(event:any, name:any){
        const only3letter = /a{3,10}|b{3,10}|c{3,10}|d{3,10}|e{3,10}|f{3,10}|g{3,10}|h{3,10}|i{3,10}|j{3,10}|k{3,10}|l{3,10}|m{3,10}|n{3,10}|o{3,10}|p{3,10}|q{3,10}|w{3,10}|r{3,10}|s{3,10}|t{3,10}|u{3,10}|v{3,10}|w{3,10}|x{3,10}|y{3,10}|z{3,10}/;
        if(only3letter.test(name)){        
            event.preventDefault();        
            return false;    
        }else{        
            return true;
        }
    }

    static onlyNumber(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
    }

    static onlyLetter(event: any) {
        const pattern = /[a-zA-Z\ñ\Ñ\ ]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
          // invalid character, prevent input           
          event.preventDefault();
        }
    }
    static fechaLimite(){
       return new Date(new Date().setDate(new Date().getDate() + 3));
    }

    static fechaInicio(){
       return new Date(1990,0,1);
    }

    static showFocus(event: any,input:any) {
        if(event.charCode==9){
            input.focus();
        }
        console.log(event.charCode);
    }
}