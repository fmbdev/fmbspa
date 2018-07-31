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


import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';


import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';


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
  rowss_mod = [];
  rowss_niv = [];
  campusTxt: any;
  nivelTxt: any;

  uploads: UploadSis[] = [];
  ciclos: Ciclo[] = [];
  campus: Campus[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  carreras: Carrera[] = [];
  campusCarreras: CampusCarrera[] = [];


  constructor(private sendServ: SendService, public dialog: MatDialog, private cicloServ: CicloService,
    private campusServ: CampusService,
    private campusCarreraServ: CampusCarreraService,
    private interesServ: InteresService,
    private modalidadServ: ModalidadService,

    private carreraServ: CarreraService) {
    this.fetch((data) => {
      this.rows = data;
    });
    this.fetchs((data) => {
      this.rowss = data;
    });

    this.fetchs_modalidad((data) => {
      this.rowss_mod = data;
    });

    this.fetchs_nivel((data) => {
      this.rowss_niv = data;
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

  fetchs_modalidad(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://devmx.com.mx/fmbapp/public/api/modalidad`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs_nivel(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://devmx.com.mx/fmbapp/public/api/nivel_estudios`);
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

     //console.log('this.modalidades');
     //console.log(this.modalidades);

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
              count =  Object.keys(filas).length;
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

            let f = 500;
              let x = 0;

            filas.forEach((key: UploadSis) => {

                var campusTM = this.getObjects(this.campus, 'crmit_codigounico', key.id_campus);
                var cicloTM = this.getObjects(this.ciclos, 'crmit_name', key.ciclo);
                var carreraTM = this.getObjects(this.carreras, 'id', key.clave_de_sis_carrera);

                //var nivelTM = this.getObjects(this.niveles, 'id', campusTM[0].crmit_tb_campusid);
                if(cicloTM.length<1){
                  this.showDialog("Formato Invalido de Ciclo");
                  return;
                } 
                if(carreraTM.length<1){
                  this.showDialog("Formato Invalido de Carrera");
                  return;
                }
                if(campusTM.length<1){
                  this.showDialog("Formato Invalido de Campus");
                  return;
                }
                
                var ciclo = cicloTM[0].crmit_name;
                var valor_ciclo = "";

                console.log("cicloTM[0].crmit_name : "+cicloTM[0].crmit_name);


                if(ciclo == "19-1"){
                  valor_ciclo = "C3";
                }else if(ciclo == "20-1"){
                  valor_ciclo = "C3";
                }else if(ciclo == "20-2"){
                  valor_ciclo = "C1";
                }else if(ciclo == "18-3"){
                  valor_ciclo = "C2";
                }

               /* for(var i = 0; i < this.ciclos.length ; i++){
                  if(this.ciclos[i] !== undefined){
                    if(ciclo == this.ciclos[0].crmit_name && this.ciclos[i].crmit_ciclovigenteventas){

                    console.log("ciclo: "+this.ciclos[i].crmit_name);
                    ciclo = this.ciclos[i].crmit_name;
                    console.log("nombreventas: "+this.ciclos[i].nombreventas);
                    valor_ciclo = this.ciclos[i].nombreventas;
                    }
                  }
                }*/


               // ciclo = valor_ciclo;

                var cicloC = valor_ciclo;

                var GUIDCiclo = cicloTM[0].crmit_codigounico;

                var campus = campusTM[0].crmi_name;
                var GUIDCampus = campusTM[0].crmit_tb_campusid;

                var GUIDCarrera = carreraTM[0].codigounico;
                var TCarrera = carreraTM[0].name;

                /* obtener nivel y modalidad */
                var NivelInteres = "" ;
                var GUIDNivelInteres = "" ;

                var Modalidad = "" ;
                var GUIDModalidad = "" ;

              for (let i = 0; i < this.rowss.length; i++) {
                if (this.rowss[i].campusId == GUIDCampus && this.rowss[i].carreraId == GUIDCarrera) {

                  GUIDModalidad = this.rowss[i].modalidadId;
                  GUIDNivelInteres = this.rowss[i].nivelId;
                }
              }

              for (let i = 0; i < this.rowss_mod.length; i++) {
                if (this.rowss_mod[i].crmit_codigounico == GUIDModalidad) {
                  Modalidad = this.rowss_mod[i].crmit_name;
                }
              }

              for (let i = 0; i < this.rowss_niv.length; i++) {
                if (this.rowss_niv[i].crmit_codigounico == GUIDNivelInteres) {
                  NivelInteres = this.rowss_niv[i].crmit_name;
                }
              }

                let Team = "";
                let Prioridad = 0;
                let Attemp = "";



                for (let i = 0; i < this.rows.length; i++) {

                  if (this.rows[i].CAMPUS == campus && this.rows[i].BL == NivelInteres && this.rows[i].CICLO == valor_ciclo) {

                    console.log("");console.log("");console.log("");
                    console.log("---------------------------------------------------");
                    console.log("");console.log("");
                    console.log("IdCampus: "+GUIDCampus);
                    console.log("NombreCampus:"+campus);

                    console.log("Modalidad: "+Modalidad);
                    console.log("NivelInteres: "+NivelInteres);

                    Team = this.rows[i].TEAM;
                    console.log("TEAM: "+Team);
                    Prioridad = parseInt(this.rows[i].PRIORIDAD);
                    console.log("PRIORIDAD: "+Prioridad);
                    Attemp = this.rows[i].ATTEMP;
                    console.log("ATTEMP: "+Attemp);
                    console.log("Ciclo:"+ciclo);
                    console.log("");console.log("");
                    console.log("---------------------------------------------------");
                    console.log("");console.log("");console.log("");
                  }else{

                  }
                }

                var u = localStorage.getItem('user');
                var data = JSON.parse(u);
                var nom_usu = data.fullname;

              var obj2 = {
                "Usuario":nom_usu,
                "GUIDUsuario":localStorage.getItem('UserId'),
                "Banner":"https://app.devmx.com.mx/upload-sis",
                "FuenteObtencion":"ABSORCION",
                "GUIDFuentedeObtencion":"2489dd13-6072-e211-b35f-6cae8b2a4ddc",
                "Attemp": Attemp,
                "FuenteNegocio": this.Tipo.value,
                "NumPersona": key.Num_Persona,
                "Prioridad": Prioridad,
                "Team": Team,
                "Ciclo":ciclo,
                "GUIDCiclo": GUIDCiclo,
                "Carrera": TCarrera,
                "GUIDCarrera": GUIDCarrera,
                "Nivel": NivelInteres,
                "GUIDNivelInteres": GUIDNivelInteres,
                "Modalidad": Modalidad,
                "GUIDModalidad": GUIDModalidad,
                "campus": campus,
                "GUIDCampus": GUIDCampus,
                "EsAlumno": true,
              };


              setTimeout(() => {
                this.sendServ.sendData7(obj2)
                  .subscribe(

                    (res: any) => {
                      console.log("res");
                      console.log("res = "+res.status);

                      if (res.status == 200) {
                        x=x+1;
                        if (count == x) {
                          this.showDialog("Los datos se han guardado correctamente.");
                          this.newdata.filename = "";
                          this.Tipo.value = "";
                          console.log("x=x+1 Guardado x = "+x);
                        }
                      } else {
                        x=x-1;
                        this.showDialog("Error al guardar el registro");
                        console.log("x=x-1 Error x = "+x);

                      }
                    },
                    error => {

                      console.log("Errores = " + error.status);


                      if (error.status === 400) {
                        console.warn(error._body);
                        this.showDialog("Error al guardar el registro");
                        x--;
                        console.log("x-- Error x = "+x);
                      }
                      else if (error.status === 500) {
                        console.warn(error._body);
                        this.showDialog("Error al guardar el registro");
                      }else{
                        console.warn(error._body);
                        this.showDialog("Error en la transaccion");
                      }
                    })
              }, f);
              });
                  let total;
                  total = f * count;

                  console.log('X = ' + x);

                   setTimeout(() => {
                          if(this.columDistin){

                          }else{

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
  }

  private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '200px',
          width: '500px',
          data: {message: message}
        });
      }

}
