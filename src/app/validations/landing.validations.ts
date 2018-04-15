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
                if (array.search(new RegExp(name, "i"))>0) {
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
        //const only3letter = /a{3,10}|b{3,10}|c{3,10}|d{3,10}|e{3,10}|f{3,10}|g{3,10}|h{3,10}|i{3,10}|j{3,10}|k{3,10}|l{3,10}|m{3,10}|n{3,10}|o{3,10}|p{3,10}|q{3,10}|w{3,10}|r{3,10}|s{3,10}|t{3,10}|u{3,10}|v{3,10}|w{3,10}|x{3,10}|y{3,10}|z{3,10}|A{3,10}|B{3,10}|C{3,10}|D{3,10}|E{3,10}|F{3,10}|G{3,10}|H{3,10}|I{3,10}|J{3,10}|K{3,10}|L{3,10}|M{3,10}|N{3,10}|O{3,10}|P{3,10}|Q{3,10}|W{3,10}|R{3,10}|S{3,10}|T{3,10}|U{3,10}|V{3,10}|W{3,10}|X{3,10}|Y{3,10}|Z{3,10}/;
        const only3letter = /[aA]{3}|[bB]{3}|[cC]{3}/;
        if(only3letter.test(name)){        
            event.preventDefault();        
            return false;    
        }else{        
            return true;
        }
    }

    static onlyNumber(event: any) {
        const pattern = /[0-9]/;
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