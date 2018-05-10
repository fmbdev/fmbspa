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
  columDistin:boolean;
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

  checkCols(workbook) //your workbook variable 
  { 
      var colValues =[]; 
      var first_sheet_name = workbook.SheetNames[0]; 
      var worksheet = workbook.Sheets[first_sheet_name]; 
      var cells = Object.keys(worksheet); 
      for (var i = 0; i < Object.keys(cells).length; i++) 
      { 
        if( cells[i].indexOf('1') > -1) 
        { 
        colValues.push(worksheet[cells[i]].v); 
        //Contails all column names 
      } 
    }
    let col = '["Num Persona","id campus","nombre corto telemarketer","ciclo","lista de seguimiento","nombre corto asesor","fuente obtención","clave de sis (Carrera)"]';
    let cColum = JSON.stringify(colValues);
    
    if(col == cColum){
      return true;
    }else{
      return false;
    } 
      
  }

   Upload() {
     let x = 0;
     let count = 0;
        
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
              let count=  Object.keys(filas).length;
              console.log(this.checkCols(workbook));
              
              if(!this.checkCols(workbook)){
                  this.showDialog("Los titulos de la columna no coinciden");                  
                  this.newdata.filename ="";
                  this.Tipo.value="";
                  this.columDistin = false;
                  return;
              }else{
                  this.columDistin = true;
              }
                  let f = 400;  
              filas.forEach(key => {
                let obj2 = {
                   "Prioridad" : tipo,
                   "Team" : tipo,
                   "Attemp" : tipo,
                  };
               
                  let datos = Object.assign(key, obj2);
                
                      setTimeout(() => {
                        this.sendServ.sendData(datos)
                          .subscribe(
                            (res: any) => {
                              console.log(res);
                              if (res.status == 200) {
                                x++;                                 
                              }else{
                              }
                            },
                            () => {
                              console.log(x);
                            }
                          )
                      }, f);  
                 
              });
                  let total;
                  total = f * count;

                  console.log('X = ' + x);
             setTimeout(() => {
                    console.log(this.columDistin);
                    if(this.columDistin){
                      //if(count == x){
                          this.showDialog("Los datos se han guardado correctamente.");
                          console.log('guardado ok');
                          this.newdata.filename ="";
                          this.Tipo.value="";
                     // }else{
                     //     this.showDialog("Error al guardar los registros.");
                     //     console.log('guardado NO');
                     //} 
                    }else{
                          console.log('columDistin false');

                    }  
                  }, total); 
              
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

  private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '200px',
          width: '500px',
          data: {message: message}
        });
      }

}
