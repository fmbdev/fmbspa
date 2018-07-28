import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { SubTipo } from '../interfaces/sub-tipo';

import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';


import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';


import { TipoActividadService } from '../providers/tipo-actividad.service';
import { SubsubtipoActividadService } from '../providers/subsubtipo-actividad.service';

import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';


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
	rowss = [];
	rowss_mod = [];
	rowss_niv = [];
	rowss_emp = [];

	campusTxt: any;
	nivelTxt: any;

	uploads: Upload[] = [];
	ciclos: Ciclo[] = [];
	campus: Campus[] = [];
	carreras: Carrera[] = [];
	escuelas_empresas: EscuelaEmpresa[] = [];
	sub_tipos: SubTipo[] = [];
	subsub_tipos: SubsubTipo[] = [];

	intereses: Interes[] = [];
	modalidades: Modalidad[] = [];



	constructor(private sendServ: SendService,
							public dialog: MatDialog,
							private cicloServ: CicloService,
							private campusServ: CampusService,
							private carreraServ: CarreraService,
							private escuelaEmpresaServ: EscuelaEmpresaService,
							private subSubServ: SubsubtipoActividadService,
							private interesServ: InteresService,
							private modalidadServ: ModalidadService

							) {
		this.fetch((data) => {
			this.rows = data;
		});
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

		this.fetchs_escuela_empresa((data) => {
			this.rowss_emp = data;
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
		// Se obtienes los Subtipos de actividades
		this.sub_tipos = this.subSubServ.getAllSubTipo();

		// Se obtienes los Subsubtipos de actividades
		this.subsub_tipos = this.subSubServ.getAllSubSubTipo();
	}

	previewImage(event){
		console.log(event.srcElement.files[0]);
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

	fetchs_escuela_empresa(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', `https://devmx.com.mx/fmbapp/public/api/escuela_empresa`);
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

				let fileReader = new FileReader();

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
									let f = 500;

									filas.forEach((key:Upload) => {

										var carreraTM = this.getObjects(this.carreras, 'id', key.carrera);
										//var escuelaTM = this.getObjects(this.escuelas_empresas, 'escuelaID', key.escuela_de_procedencia);
										var campusTM = this.getObjects(this.campus, 'crmi_name', key.campus);
										var cicloTM = this.getObjects(this.ciclos, 'crmit_name', key.ciclo);
										var subtipoTM = this.getObjects( this.sub_tipos,'crmit_subname',key.sub_tipo);
										var subsubtipotTM = this.getObjects( this.subsub_tipos,'crmit_subsubname',key.sub_sub_tipo);
										

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

										/*if(escuelaTM.length<1){
											this.showDialog("Formato Invalido de Escuela");
											return;
										}*/
										
										if(subtipoTM.length<1){
											this.showDialog("Formato Invalido de Subtipo");
											return;
										}
										if(subsubtipotTM.length<1){
											this.showDialog("Formato Invalido de SubSubtipo");
											return;
										}  


										var keyCelular = key.Teléfono_Celular;
										var keyTelefono = key.Teléfono_Domicilio;
										var skeyTelefono = keyTelefono.toString();
										var skeyCelular = keyCelular.toString();

												var predTel = skeyCelular.substring(0,2);
												var TelefonoPredictivo = null;
												TelefonoPredictivo = '9045'+skeyCelular;
												if(predTel == '55'){
													TelefonoPredictivo = '9044'+skeyCelular;
												}

												var TelefonoCasaPredictivo = null;

												var predTel2 = skeyTelefono.substring(0,2);
												TelefonoCasaPredictivo = '901'+skeyTelefono;

												if(predTel2 == '55'){
													TelefonoCasaPredictivo = '9'+skeyTelefono;
												}

										var   Genero = key.Sexo;

										if(Genero=='M'){Genero='Masculino'; }else{Genero='Femenino';}

										var ciclo = cicloTM[0].crmit_name;
										var ciclo_mocho = ciclo.split('-');
										var cicloC = "C" + ciclo_mocho[1];
										var GUIDCiclo = cicloTM[0].crmit_codigounico;

										var GUIDCarrera=carreraTM[0].codigounico;
										var TCarrera=carreraTM[0].name;

										var GUIDEscuelaEmpresa = GUIDEscuelaEmpresa_;
									 // var TEscuelaEmpresa=escuelaTM[0].Name;
										var GUIDCalidad=GUIDCalidadid_;


										var GUIDCampus=campusTM[0].crmit_tb_campusid;
										var campus = campusTM[0].crmi_name;


										var GUIDCiclo=cicloTM[0].crmit_codigounico;
										var GUIDSubTipo = subsubtipotTM[0].crmit_subtipoactividadid;
										var GUIDSubSubTipo = subtipoTM[0].crmit_codigounico;

										var u = localStorage.getItem('user');
										var data = JSON.parse(u);
										var nom_usu = data.fullname;

										/* obtener nivel y modalidad */
										var NivelInteres = "";
										var GUIDNivelInteres = "";

										var Modalidad = "";
										var GUIDModalidad = "";



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



										var EscuelaEmpresa_ = "";
										var GUIDEscuelaEmpresa_ = "";
										var GUIDCalidadid_ = "";

									 // console.log("");console.log("");console.log("");

										for (let i = 0; i < this.rowss_emp.length; i++) {
											console.log(this.rowss_emp[i].escuelaID +"=="+ key.escuela_de_procedencia);
											if (this.rowss_emp[i].escuelaID == key.escuela_de_procedencia) {

												EscuelaEmpresa_ = this.rowss_emp[i].Name;
												//console.log("EscuelaEmpresa_ : "+EscuelaEmpresa_);
												GUIDEscuelaEmpresa_ = this.rowss_emp[i].crmit_empresaescuela;
												//console.log("GUIDEscuelaEmpresa_ : "+GUIDEscuelaEmpresa_);
												GUIDCalidadid_ = this.rowss_emp[i].crmit_calidadid;
												//console.log("GUIDCalidadid_ :"+GUIDCalidadid_);
											}
										}
									 // console.log("");console.log("");console.log("");


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
											}
										}

										var GUIDUsuario = localStorage.getItem('UserId');

										var u = localStorage.getItem('user');
										var data = JSON.parse(u);
										var nom_usu = data.fullname;
										var guidcalidad  = GUIDCalidadid_;


										var obj2 = {
											"Usuario":nom_usu,
											"GUIDUsuario": GUIDUsuario,
											"Banner":"https://app.devmx.com.mx/upload",
											"FuenteObtencion":"BD EXTERNA",
											"GUIDFuentedeObtencion":"2689dd13-6072-e211-b35f-6cae8b2a4ddc",
											"FuenteNegocio":this.Tipo.value,
											"Attemp": Attemp,
											"Prioridad": Prioridad,
											"Team": Team,
											"ApellidoMaterno":key.Apellido_Materno,
											"ApellidoPaterno": key.Apellido_Paterno,
											"Genero":Genero,
											"Calidad":key.calidad,
											"GUIDCalidad":GUIDCalidadid_,
											"Telefono":skeyCelular,
											"TelefonoPredictivo":TelefonoPredictivo,
											"TelefonoCasa":skeyTelefono,
											"TelefonoCasaPredictivo":TelefonoCasaPredictivo,
											"AreaInteres":key.area_atención,
											"Campus": key.campus,
											"CorreoElectronico": key.Correo_Electronico,
											"GUIDCampus":GUIDCampus,
											"Carrera":TCarrera,
											"GUIDCarrera":GUIDCarrera,
											"Ciclo": ciclo,
											"GUIDCiclo":GUIDCiclo,
											"EscuelaEmpresa":EscuelaEmpresa_,
											"GUIDEscuelaEmpresa":GUIDEscuelaEmpresa_,
											"SubSubTipo":key.sub_sub_tipo,
											"GUIDSubSubTipo":GUIDSubSubTipo,
											"SubTipo":key.sub_tipo,
											"GUIDSubTipo":GUIDSubTipo,
											"Nivel": NivelInteres,
											"GUIDNivelInteres": GUIDNivelInteres,
											"Modalidad": Modalidad,
											"GUIDModalidad": GUIDModalidad,


										};

										delete key.Sexo;
										delete key.Teléfono_Celular;
										delete key.Teléfono_Domicilio;
										delete key.area_atención;
										delete key.sub_sub_tipo;
										delete key.sub_tipo;
										delete key.campus;
										delete key.carrera;
										delete key.ciclo;
										delete key.calidad;
										delete key.escuela_de_procedencia;
										delete key.fuente_obtención;
										delete key.Apellido_Materno;
										delete key.Apellido_Paterno;
										delete key.Correo_Electronico;


										var datos = Object.assign(key, obj2);
											setTimeout(() => {
												this.sendServ.sendData4(datos)
													.subscribe(
														(res: any) => {
															console.log("res");
															console.log(res);
															if (res.status == 200) {
																this.sendServ.sendData6(datos)
																	.subscribe(
																		(ress: any) => {
																			console.log("ress");
																			console.log(ress);
																		}
																	);
																x = x + 1;
																if (count == x) {
																	this.showDialog("Los datos se han guardado correctamente.");
																	this.newdata.filename = "";
																	this.Tipo.value = "";
																}
															} else {
																x = x - 1;
																this.showDialog("Error al guardar el registro");
															}
													},
														error => {
															if (error.status === 400) {
																console.log(error);
																//this.showDialogE(error._body);
															}
															else if (error.status === 500) {
																//this.showDialogE(error._body);
															}
													})
											}, f);

									});




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
