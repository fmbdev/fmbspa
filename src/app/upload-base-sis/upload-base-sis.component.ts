import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import * as XLSX from 'xlsx';

import { SendService } from '../providers/send.service';

@Component({
  selector: 'app-upload-base-sis',
  templateUrl: './upload-base-sis.component.html',
  styleUrls: ['./upload-base-sis.component.scss']
})
export class UploadBaseSisComponent implements OnInit {
   @ViewChild("imgFileInput") imgFileInput: any;
  @ViewChild("Tipo") Tipo: any;

  newdata: any = {};
  form: FormGroup;
  datos: FormControl;
  arrayBuffer:any;
file:File;
  
  constructor(private sendServ: SendService,public dialog: MatDialog) { }

  ngOnInit() {
    this.form = new FormGroup({
      datos: new FormControl(''),
    });
  }

  previewImage(event){  
    console.log("-ll- Ok"); 
     this.newdata.filename = event.srcElement.files[0].name;         
  } 


   Upload() {
         let tipo = this.Tipo.value;
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              var rol = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              let filas = XLSX.utils.sheet_to_json(worksheet,{raw:true});
              filas.forEach(key => {
                let obj2 = {
                   "Prioridad" : tipo,
                   "Team" : tipo,
                   "Attemp" : tipo,
                  };

            let datos = Object.assign(key, obj2);                               
                this.sendServ.sendData2(datos)
                 .subscribe(
                      (res: any) => {
                          if(res.status == 200){
                               console.log(res.status);   
                             
                          }else{
                               console.log(res.status);                             
                          }
                      }
                )
              });
          }
          
          fileReader.readAsArrayBuffer(this.imgFileInput.nativeElement.files[0]);
  }

  onSubmit(){
    /*this.sendServ.sendData('http://devmx.com.mx/fmbapp/public/api/sendData',this.form.value)
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            //this.showDialog("Los datos se han guardado correctamente.");
            //this.resetForm();
          } else {
            //this.showDialog("Error al realizar el registro.");
            //this.resetForm();
          }
        }
      )*/
      console.log(this.form.value)
  }

}
