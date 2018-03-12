import { Component, OnInit, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl, FormsModule, FormGroupDirective, NgForm} from '@angular/forms';
import { AbstractControl, NG_VALIDATORS, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = /alkj|balk|blaj|blal|ccfe|cerc|cfew|crcw|cten|cwef|cwer|dgji|dhdn|djuo|dmjc|efcc|ehew|ercw|erhu|eruh|fccf|fdgj|fdju|ffgf|fgff|fgfg|fghu|fyut|gfdg|gffg|gfgf|ghui|gjif|gyhu|gyuw|hdnv|hewr|huik|huiw|huwe|ifdj|igsd|ikty|iwre|jbla|jcte|jifd|jigs|jksd|juoi|kjbl|kqnw|kqwk|ksdm|ktyf|kuyt|lajk|lbal|lkjb|lsdm|m sk|mdhj|nvji|oidf|rcer|rcwe|rhue|rhui|ruhu|sdhd|sdmd|sdmj|skqn|skqw|swqn|tenv|tfgh|tyfy|uerh|uerw|ugfd|uhuw|uikt|uiwr|uoid|uwer|uytf|vjig|wefc|werc|werh|weru|wqnm|wreh|yfyu|yhue|ytfg|yugf|yutf|yuwe|fgsd|ergs|grty|drgd|alsd|mjct|envj|djks|dmdh|jsdh|dnv|xzzf|afsa|tdg|gsz|sz|duhe|edc|cgh|ghd|turru|rurt|fgj|gjg|gfk|glh|huj|shd|bcc|hshs|djdj|asda|fdfd|dxxc|hhhh|bxcb|blabla|bloblo|aloh|nrnr|fgdg|ffyf|baaf|ddcc|ffdd|sjsn|sfdd|fqef|fsff|ddxc|gdgf|hfcb|gjdj|hxgh|xhgx|bhbh|kjhh|bsbs|klhl|rqrq|kekd|sasa|sisi|reret|xdsg|abec|fefe|webo|nyolx|ccgjh|fadf|bulabe|efq|luego|erdem|juanbenito|yolo|ddsv|memo|fulanito|hfcbbi|hjdjh|rirdfo|hisjd|ezra|vcb|taewe|http|fsdgfsd|pancho|lokon|izhmir|gmbo|tito|erwq|jhk|aaee|oeds|milki|oskr|sunn|rerer|nora vivia|retrdtr|krmn|hrth|afwef|codision|ytufut|rwerwere|akiva|jeziel|bla bla|raraaf|kbd|dage|dgfg|frfregetgr|yuya|fuif|xghij|wegwgr|vhg|gvg|fdghf|luigui|luialmanza|asdasdas|xereerer|puta madre|gdfgd|matafesio|ttgt|bfbf|ahhesaqs|asdda|yolia|sedd|dffgt|tutsi|fefreferfr|assaasa|sfdzser|chucho|ghfg|alfito|ckbad|huhbgvf|adaw|wwdd|asumen|xdsgdg|martona|chanfle|dfgdf|hhjhge|dnjs|hhj|kajs|jsjs|jajaj|aasaa|aafs|only|networ|agah|shsh|jjs|gghh|bbhh|nkoh|klhj|gdgd|xret|xrre|kml|iolk|tengo|pgom|cst|suhh|ghf|pepito|iuni|ujiu|baby|lolo|hardy|control|desconocido|apocope|zvzc|csaf|wars|atsv|qeax|gasf|csaz|klkl|rowe|ejrl|dsc|nivx|djfa|eoir|kdlf|fsdl|kwje|xlcv|rtuy|jcvn|qazx|swed|dcvf|vrtg|byhn|mjui|iklo|fdfg|yuiop|fghj|jklm|zxcv|zxcvb|xcvb|cvbn|vbnm|mnbv|cxza|fdsa|kjhg|lkjh|poiu|iuuyt|rewq|wqwqw|qwqw|zqwd|qwdd|wksn|ksnj|snjs|nsns|snsn|woie|oier|ssgg|hjje|jjee|wwee|eerr|ttyy|yyuu|tyyu|aass|assd|ssdd|soso|dsew|sewq|ewqe|wqew|qewt|eqwt|qwte|wtew|ewew|wewq|ewqw|wqwq|aegs|egsb|gsbg|jkty|ktyt|tyty|ytyj|tyjr|ewer|fdd|kbak|ijus|ppe|edau|dgh|wdc|ksdy|fetg|didd|sdvs|asaf|ghh|xxx|msus|fsd|tuyt|elver|jsks|drozz|lmm|leet|hfc|ccxx|fff|hlek|hjja|pee|ryyy|viro|ajaj|utbb|psm|djah|msm|brgb|kik|vbv|ghg|tdfy|xhkf|aqwew|kll|sdd|test|jgkk|aaad|abb|mylady|fgg|adfw|mmnj|jhgs|ffkc|idj|ernej|abc|adk|cdcd|xasf|jkk|adds|frr|gyuu|ffca|ftgh|ffsf|aasds|afdsjkl|asdrubal|xxasd|asfcasdc|fewrwererwee|hfs|afa|ayoung|fddsadas|xcasd|ewrwer|fjddjv|adfwf|nohh|tzuc|lumbi|xadsa|werwer|dgvxgv|afoaisnfona|noh|zib|vgfyhjrfyje|asdf|maruio|mander|mades|gayluis|gaylor|asdk|ajfi|ojss|cxbcvn|oacr|line|atom|aksis|jolik|veic|knight|caca|orina|mierda|asqueroso|apellido|qwrqwweq|superman|culiada|manches|maricon|pendejo|batman|marica|ramera|skulls|dadsa|dffdd|holis|mamar|nalga|perra|tinaa|kdfh|jslk|dlkf|wieo|completonopasa|cnvm|trial|iuiou|aeiou|adsf|culo|jaja|joto|nomb|pito|puta|puto|xoxo|verga|nene|dada|baboso|pantera|pene|popo|tu puta madre|chinga|zqwdd|web|gwer|dfgh|dfgha|fgh|wweerr|sososo|aegsbg|wksnjs|woier|segibia|dassgg|ttyyuu|qwer|dsewqewt|goerd|nsnsn|ajuer|hjjee|aassdd|eqwtewewqwq|jktytyjr|chula|perdo|lopo|heintricu|rocken|shazam|elver|coca|nombre|rick|kiko|moco|moshe|privado|kimo|contacto|sabe|perro|demos|tutu|sionsa|ninguno|poseidon|asf|cola|pancho|abombado|asds|dhhgdd|oiidl|xhhjh|ooiddl|fhhjse/i.test(name);
    return no ? {'forbiddenName': {name}} : null;
  };
}

function numeroNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = /^[0-9]/.test(name);
    return no ? null :  {'numeroName': {name}};
  };
}

function letrasNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = /[a-zA-Z]/.test(name);
    return no ? null : { 'letrasName': {name}}  ;
  };
}

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "codecraft.tv") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'tlkm-create',//contact-create
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})




export class TLKMComponent {

  defaults = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'va11', viewValue: 'va11'}, {value: 'val2', viewValue: 'val2'}, {value: 'val3', viewValue: 'val3'} ];

  canales = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Voz', viewValue: 'Voz'}, {value: 'Chat', viewValue: 'Chat'}, {value: 'WA', viewValue: 'WA'} ];
  csqs = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Val1', viewValue: 'Val1'}, {value: 'Val2', viewValue: 'Val2'}, ];
  campus = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Atizapan', viewValue: 'Atizapan'}, {value: 'Cuitlahuac', viewValue: 'Cuitlahuac'}, {value: 'Ecatepec', viewValue: 'Ecatepec'} ];
  niveles = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Bachillerato', viewValue: 'Bachillerato'}, {value: 'Licenciatura', viewValue: 'Licenciatura'}, {value: 'Posgrado', viewValue: 'Posgrado'}, ];
  modalidades = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Presencial', viewValue: 'Presencial'}, {value: 'En línea', viewValue: 'En línea'}, {value: 'Mixta', viewValue: 'Mixta'}, ];
  programas = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Prepa SEP', viewValue: 'Prepa SEP'}, {value: 'Arquitectura', viewValue: 'Arquitectura'}, {value: 'Diseño', viewValue: 'Diseño'}, {value: 'Gastronomía ', viewValue: 'Gastronomía'}, {value: 'Mercadotecnia ', viewValue: 'Mercadotecnia'}, ];
  ciclos = [{value: '', viewValue: 'Selecciona una opción'}, {value: '18-2', viewValue: '18-2'}, {value: '18-3', viewValue: '18-3'}, {value: '19-1', viewValue: '19-1'}, ];
  sexos = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Hombre', viewValue: 'Hombre'}, {value: 'Mujer', viewValue: 'Mujer'} ];
  interes = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Interesa', viewValue: 'Interesa'}, {value: 'No interesa', viewValue: 'No interesa'} ];
  parentescos = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Papa', viewValue: 'Papà'}, {value: 'Mama', viewValue: 'Mamà'}, {value: 'Abuelo(a)', viewValue: 'Abuelo(a)'}, {value: 'Tutor', viewValue: 'Tutor'}, {value: 'Hermano(a)', viewValue: 'Hermano(a)'} ];
  hora = [{value: '', viewValue: 'Selecciona una opción'}, {value: '9am', viewValue: '9am'}, {value: '10am', viewValue: '10am'}, {value: '11am', viewValue: '11am'}, {value: '12pm', viewValue: '12pm'}, {value: '1pm', viewValue: '1pm'}, {value: '2pm', viewValue: '2pm'}, ];
  asesor = [{value: '', viewValue: 'Selecciona una opción'}, {value: 'Juan Lopez', viewValue: 'Juan Lopez'}, {value: 'Javier guerrero', viewValue: 'Javier guerrero'}, ];

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email2FormControl = new FormControl('', [Validators.required, Validators.email]);

  canalFormControl = new FormControl('', [Validators.required]);
  campusFormControl = new FormControl('', [Validators.required]);
  nivelesFormControl = new FormControl('', [Validators.required]);
  modalidadFormControl = new FormControl('', [Validators.required]);
  carreraFormControl = new FormControl('', [Validators.required]);

  csqFormControl  = new FormControl('', [Validators.required]);
  tipificacionFormControl  = new FormControl('', [Validators.required]);
  interesFormControl  = new FormControl('', [Validators.required]);
  
  nombreFormControl  = new FormControl('', [Validators.required,letrasNameValidator(),forbiddenNameValidator()]);
  apellidoPaternoFormControl  = new FormControl('', [Validators.required,letrasNameValidator(),forbiddenNameValidator()]);
  apellidoMaternoFormControl  = new FormControl('', [Validators.required,letrasNameValidator(),forbiddenNameValidator()]);
  
  TelefonoFormControl = new FormControl('',[Validators.required]);


  matcher = new MyErrorStateMatcher();

  constructor() {}
 
  ngOnInit() {}

  onFormSubmit(){}

}