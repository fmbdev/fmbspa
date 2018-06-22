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

import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';
import { Upload } from '../interfaces/upload';

import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';


@Component({
  selector: 'app-upload-base',
  templateUrl: './upload-base.component.html',
  styleUrls: ['./upload-base.component.scss']
})
export class UploadBaseComponent implements OnInit {
  
  @ViewChild("imgFileInput") imgFileInput: any;
  @ViewChild("Tipo") Tipo: any;

  newdata: any = {};
  form: FormGroup;
  datos: FormControl;
  arrayBuffer:any;
  file:File;
  columDistin:boolean;
  rows = [];
  campusTxt: any;
  nivelTxt: any;

  uploads: Upload[] = [];
  ciclos: Ciclo[] = [];
  campus: Campus[] = [];
  carreras: Carrera[] = [];
  escuelas_empresas: EscuelaEmpresa[] = [];

  constructor(private sendServ: SendService, 
              public dialog: MatDialog,
              private cicloServ: CicloService,
              private campusServ: CampusService,
              private carreraServ: CarreraService,
              private escuelaEmpresaServ: EscuelaEmpresaService
              ) {
    this.fetch((data) => {
      this.rows = data;
    });
  }




  ngOnInit() {
    this.form = new FormGroup({
      datos: new FormControl(''),
    });


    // Se obtienen todos los campus
    this.campusServ.getAll()
      .subscribe(
        (data: Campus[]) => this.campus = data
      )

    // Se obtienen todos los campus
    this.carreraServ.getAlls()
      .subscribe(
        (data: Carrera[]) => this.carreras = data
      )


    // Se obtienen los ciclos
    this.cicloServ.getAll()
      .subscribe(
        (data: Ciclo[]) => this.ciclos = data
      )
    this.escuelaEmpresaServ.getAll()
      .subscribe(
        (data: EscuelaEmpresa[]) => this.escuelas_empresas = data
      )
  }

  previewImage(event){  
    console.log(event.srcElement.files[0]); 
     this.newdata.filename = event.srcElement.files[0].name;
  }

  
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/carga-externa.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
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
        } 
      }
      let col = '["Apellido_Paterno","Apellido_Materno","Nombre","Sexo","Teléfono_Domicilio","Teléfono_Celular","Correo_Electronico","escuela_de_procedencia","sub_tipo","sub_sub_tipo","calidad","campus","carrera","ciclo","area_atención","fuente_obtención"]';
      let cColum = JSON.stringify(colValues);
    
      if(col == cColum){
        return true;
      }else{
        return false;
      }    
  }
  
  
  Upload() {
    // Obtener 


     let x = 0;
     let count = 0;
        
        let tipo = this.Tipo.value;

        //this.showDialog("Debe elegir un archivo."); 

        console.log(this.imgFileInput.value);
        
        let fileReader = new FileReader();
        
        console.log(fileReader);

          fileReader.onload = (e) => {

              this.arrayBuffer = fileReader.result;
            
              var data = new Uint8Array(this.arrayBuffer);
            
              var arr = new Array();
            
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            
              var bstr = arr.join("");
            
              var workbook = XLSX.read(bstr, {type:"binary"});
            
              var first_sheet_name = workbook.SheetNames[0];

              var worksheet = workbook.Sheets[first_sheet_name];
              
              let filas = XLSX.utils.sheet_to_json(worksheet,{raw:true});

              let count=  Object.keys(filas).length;

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

                  filas.forEach((key:Upload) => {
                    console.log(key);
                    /*

                    this.form.value.FuenteObtencion = key.fuente_obtención;
                    var ciclo = key.ciclo;
                    this.campusTxt = key.campus;
                    this.nivelTxt = key.ciclo;
                    for (let i = 0; i < this.rows.length; i++) {
                      if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == ciclo) {
                        this.form.value.Team = this.rows[i].TEAM;
                        this.form.value.Prioridad = this.rows[i].PRIORIDAD;
                        this.form.value.Attemp = this.rows[i].ATTEMP;
                        this.form.value.FuenteObtencion = this.rows[i].FUENTE_NEGOCIO;
                      }
                    }
                    */
                    
                    var carreraTM = this.getObjects(this.carreras, 'id', key.carrera);

                    console.log(key);
                    console.log(carreraTM[0]);

                    let obj2 = {
                       "Prioridad" : 0,
                       "Team" : "",
                       "Attemp" : 0,
                      "FuenteObtencion": "BD EXTERNA"
                    };


                    let datos = Object.assign(key, obj2);
              
                     /*
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
                     */ 
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
          } else {
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
  //return an array of objects according to key, value, or key and value matching
 getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(this.getObjects(obj[i], key, val));
    } else
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
        objects.push(obj);
      } else if (obj[i] == val && key == '') {
        //only add if the object is not already in the array
        if (objects.lastIndexOf(obj) == -1) {
          objects.push(obj);
        }
      }
  }
  return objects;
}

//return an array of values that match on a certain key
 getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(this.getValues(obj[i], key));
    } else if (i == key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

//return an array of keys that match on a certain value
 getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(this.getKeys(obj[i], val));
    } else if (obj[i] == val) {
      objects.push(i);
    }
  }
  return objects;
}

}
