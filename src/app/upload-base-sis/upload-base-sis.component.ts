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
import { UploadSis } from '../interfaces/upload-sis';
import { CampusCarrera } from '../interfaces/campus-carrera';

import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';


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
  rows = [];
  rowss = [];
  campusTxt: any;
  nivelTxt: any;

  uploads: UploadSis[] = [];
  ciclos: Ciclo[] = [];
  campus: Campus[] = [];
  carreras: Carrera[] = [];
  campusCarreras: CampusCarrera[] = [];

  
  constructor(private sendServ: SendService, public dialog: MatDialog, private cicloServ: CicloService,
    private campusServ: CampusService,
    private campusCarreraServ: CampusCarreraService,
    private carreraServ: CarreraService) {
    this.fetch((data) => {
      this.rows = data;
    });
    this.fetchs((data) => {
      this.rowss = data;
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

     

  }

  previewImage(event){
     this.newdata.filename = event.srcElement.files[0].name;
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/carga-sis.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://devmx.com.mx/fmbapp/public/api/campus_carreras`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  checkCols(workbook)
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

    let col = '["Num_Persona","id_campus","nombre_corto_telemarketer","ciclo","lista_de_seguimiento","nombre_corto_asesor","fuente_obtención","clave_de_sis_carrera"]';

    let cColum = JSON.stringify(colValues);
    console.log(cColum);
    console.log(col);
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
            filas.forEach((key: UploadSis) => {
          
                /*
                this.form.value.FuenteObtencion = null;
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
              
                var campusTM = this.getObjects(this.campus, 'crmit_codigounico', key.id_campus);
                var cicloTM = this.getObjects(this.ciclos, 'crmit_name', key.ciclo);
                
                var carreraTM = this.getObjects(this.carreras, 'id', key.clave_de_sis_carrera);

                //var nivelTM = this.getObjects(this.niveles, 'id', campusTM[0].crmit_tb_campusid);
                
                var ciclo = cicloTM[0].crmit_name;
                var GUIDCiclo = cicloTM[0].crmit_codigounico;
  
                var campus = campusTM[0].crmi_name;
                var GUIDCampus = campusTM[0].crmit_tb_campusid;
                
                var GUIDCarrera = carreraTM[0].codigounico;
                var TCarrera = carreraTM[0].name;
                

                /* obtener nivel y modalidad */
              let nivel = "" ;
              let GUIDNivelInteres = "" ;

              let Modalidad ="" ;
              let GUIDModalidad ="" ;
              for (let i = 0; i < this.rowss.length; i++) {
                console.log(this.rowss[i]);
              }

              var obj2 = {
                "FuenteObtencion": this.Tipo.value,
                "Campus": campus,
                "GUIDCampus": GUIDCampus,

                "Carrera": TCarrera,
                "GUIDCarrera": GUIDCarrera,

                "Ciclo": key.ciclo,
                "GUIDCiclo": GUIDCiclo,
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
