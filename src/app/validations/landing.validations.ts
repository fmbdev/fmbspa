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
            let arrayBasura = localStorage.getBasuraObs;
            let arrEmail = control.value.split('@');
            let lenUser = arrEmail[0].length;
            let username = arrEmail[0];            

            try {
                var arrDominio = arrEmail[1].split('.');
                var arrLargo = arrDominio.length;
                var ddominio =arrDominio[0];
                console.log(ddominio);
            }catch(err) {}


            /*
                //Esta vacio el correo
            if (arrayBasura.search(new RegExp(username, "i"))>0) {
                console.log("mail 2");
                return {'emailMalo': {name}} 
                //Validar arroba                                
            }else if(arrEmail.length <= 1){
                console.log("mail 3");
                return {'emailMalo': {name}}
                //Validamos en el json basura la parte 2 del correo            
            }else if(arrEmail[1]==''){
                console.log("mail 33");
                return {'emailMalo': {name}}
                //Validamos en el json basura la parte 2 del correo            
            }else if(arrLargo.length <= 1){
                console.log("mail 3");
                return {'emailMalo': {name}}
                //Validamos en el json basura la parte 2 del correo            
            }else if (arrayBasura.search(new RegExp(ddominio, "i"))>0) {
                console.log("mail 4");
                return {'emailMalo': {name}}
                //Validamos que no existen caracteres especiales en el dominio                                  
            }else if(username.search(/[^a-zA-Z0-9_.-]/)!=-1){ 
                console.log("mail 5");
                return {'emailMalo': {name}}
                //Validacion de dominios MS                   
            }else if(ddominio.search(/(hotmail|outlook|live)/i)!= -1 && (arrEmail[0][lenUser-1].search(/\./)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/\.{2}/g) != -1) ){
                 console.log("mail 6");
                 return {'emailMalo': {name}}
                //Validacion de dominios gmail                
            }else if(ddominio.search(/gmail/i)!= -1 && (arrEmail[0][lenUser-1].search(/[^a-zA-Z0-9]/)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/\.{2}/g) != -1 || arrEmail[0].search(/(-|_)/g) != -1)){
                console.log("mail 7");
                return {'emailMalo': {name}}
                //Validacion de dominios yahoo     
            } else if(ddominio.search(/yahoo/i)!= -1 && (arrEmail[0][lenUser-1].search(/[^a-zA-Z0-9]/)!=-1 || arrEmail[0][0].search(/(_|\.|[0-9])/)!=-1 || arrEmail[0].search(/(\.|_){2}/g) != -1 || arrEmail[0].search(/-/g)!=-1 ) ){
                console.log("mail 8");
                return {'emailMalo': {name}}
                //Validacion de dominios restantes       
            }else if(ddominio.search(/(^hotmail|outlook|gmail|live|yahoo)/i) == -1 && ( arrEmail[0][lenUser-1].search(/(-|_|\.)/)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/(-|_|\.){2}/g) != -1)){
                console.log("mail 9");
                return {'emailMalo': {name}}
                 //Validacion de dominios por ejemplo debe tener @mail.com por ejemplo 
            }else{
                return null;
            }*/

            if(name.search(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) !== -1){
                console.log("Ok");
            }else{
                return {'emailMalo': {name}}
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