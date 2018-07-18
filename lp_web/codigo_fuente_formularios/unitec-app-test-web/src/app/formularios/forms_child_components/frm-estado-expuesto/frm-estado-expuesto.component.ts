import { Component, ViewEncapsulation, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {formCookiesService} from '../../forms_services/formCookies.service';
import { FormGroup } from '@angular/forms';
import { readJson } from "../../../services/readJson.service";
declare var jQuery : any;
declare var $ :any;

@Component({
  selector: 'frm-estado-expuesto',
  templateUrl: './frm-estado-expuesto.component.html',
  styleUrls: ['./frm-estado-expuesto.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [readJson]
})

export class frmEstadoExpuestoComponent
{ 
  @Input() formularioPadre;
  @Input() asterisk : boolean;
  @Input() fase : string;
  inputComponent : string;
  titulo_linea = "¿Qué quieres estudiar?";
  private siguiente_paso : string = "lineas_de_negocio";
  //Listado de Estados
  estados = [
    {"id": "1","name":"Aguascalientes"},
    {"id": "2","name":"Baja California Norte"},
    {"id": "3","name":"Baja California Sur"},
    {"id": "4","name":"Campeche"},
    {"id": "5","name":"Coahuila"},
    {"id": "6","name":"Colima"},
    {"id": "7","name":"Chiapas"},
    {"id": "8","name":"Chihuahua"},
    {"id": "9","name":"Ciudad de México"},
    {"id": "10","name":"Durango"},
    {"id": "11","name":"Estado de México"},
    {"id": "12","name":"Guanajuato"},
    {"id": "13","name":"Guerrero"},
    {"id": "14","name":"Hidalgo"},
    {"id": "15","name":"Jalisco"},
    {"id": "16","name":"Michoacán"},
    {"id": "17","name":"Morelos"},
    {"id": "18","name":"Nayarit"},
    {"id": "19","name":"Nuevo León"},
    {"id": "20","name":"Oaxaca"},
    {"id": "21","name":"Puebla"},
    {"id": "22","name":"Querétaro"},
    {"id": "23","name":"Quintana Roo"},
    {"id": "24","name":"San Luis Potosí"},
    {"id": "25","name":"Sinaloa"},
    {"id": "26","name":"Sonora"},
    {"id": "27","name":"Tabasco"},
    {"id": "28","name":"Tamaulipas"},
    {"id": "29","name":"Tlaxcala"},
    {"id": "30","name":"Veracruz"},
    {"id": "31","name":"Yucatán"},
    {"id": "32","name":"Zacatecas"}
  ];
  private titulo_estado = "Selecciona tu Estado";
  
  constructor(
    private formCookieService:formCookiesService, 
    private readJsonService: readJson
  )
  {
    //cookies.setObject('foo', {bar: 'baz'});
    //cookies.setObject('foo', {baaddar: 'bdadadaz'});
    //console.log(cookies.getObject('foo'));
  }
  ngOnInit()
  {
      
      this.inputComponent = this.fase + '.frm_estado_expuesto';
      jQuery(document).ready(function(){
          //Se cambia el titulo del paso actual
          jQuery(".app-menu-title").html(this.titulo_estado);
          //Funcionalidad de div activo para listado de estados
          jQuery('.division-div').click(function() {
              jQuery(this).addClass('active').siblings().removeClass('active')
          });
      });
    //Colocar los estilos a las flechas
    console.log("Antes de agregar el estilo en muestra estados");
    //jQuery(".app-rigth-arrow").addClass("active-right-arrow");

  }

  muestraLineasDeNegocio(estadoSeleccionado) {

    //Guardamos en formapp y en cookie estado seleccionado
    jQuery("#formApp").data("estado", estadoSeleccionado);
    if(this.formCookieService.getCookieByKey("c_form_data","estado") == false) {
      this.formCookieService.appendCookieValue("c_form_data", "estado", estadoSeleccionado);
    }


    console.log("Siguiente paso muestra lineas de negocio" );
    //Ocultamos el selector actual
    jQuery(".col-estados").hide('slow');
    //Cambiamos el titulo
    jQuery(".app-menu-title").html(this.titulo_linea);
    //Mostramos el siguiente selector
    jQuery(".col-lineas-negocio").show('slow');
    jQuery("#secLineasNegocio").show('slow');
    //Cambiar la funcionalidad del boton siguiente
    //jQuery(".app-rigth-arrow").unbind();
    //jQuery(".app-rigth-arrow").bind("click",(event) => this.seleccionarLinea(event));
    //Mostar flecha izquierda
    jQuery(".app-left-arrow").css("visibility", "visible");
    //Colocar el estilo a la flecha derecha
    console.log("Antes de agregar el estilo en mostrar lineas de negocio");
    //jQuery(".app-rigth-arrow").addClass("active-right-arrow");
    //jQuery(".app-left-arrow").addClass("active-right-arrow");
    //Colocar funcionalidad de flecha izquierda
    jQuery(".app-left-arrow").unbind();
    jQuery(".app-left-arrow").bind("click",(event) => this.seleccionarEstado(event));
    
    //PRECARGA DE VALORES
    //Validamos si exixte en la cookie por campaña el valor para linea de negocio
    if(this.formCookieService.getCookieByKey("c_preload_form","nivelInteres") != false) {
      console.log("SI TIENE EL VALOR DE COOKIE POR CAMPAÑA");
      //Ejecutamos click a la linea de negocio correspondiente
      this.clickNivelInteres(this.formCookieService.getCookieByKey("c_preload_form","nivelInteres"));

      //SI no tiene la cookie por la url de campaña, entonces validamos por url de producto para la precarga
    }else if( (jQuery("#h_id_producto").val() != "" && typeof jQuery("#h_id_producto").val() != "undefined") && jQuery("#h_prellenado_formulario_pagina").val() == "true" ) {
      console.log("NODO CARRERAS POR URL");
      var nodo_encontrado = this.readJsonService.buscar("Grupo_carreras", jQuery("#h_id_producto").val(), JSON.parse(localStorage.getItem("jsonCarreras")));
      console.log(nodo_encontrado);
      this.clickLineaPorLineaWeb(nodo_encontrado[0].lineaweb);
    }

    //Añadir a la coockie del formulario el valor de estado
  }

clickLineaPorLineaWeb(lineaweb)
{
    switch (lineaweb) {
      case "PREPARATORIA":
      jQuery(".PREPA").click();
      break;
    case "LICENCIATURA":
      jQuery(".UG").click();
      break;
    case "INGENIERIA":
      jQuery(".ING").click();
      break;
    case "SALUD":
      jQuery(".CS").click();
      break;
    case "POSGRADO":
      jQuery(".POS").click();
      break;
    default:
      break;

  }//Fin del switch
}



  clickNivelInteres(nivelInteres)
  {

    switch (nivelInteres) {
        case "PREPA":
        jQuery(".PREPA").click();
        break;
      case "UG":
        jQuery(".UG").click();
        break;
      case "ING":
        jQuery(".ING").click();
        break;
      case "CS":
        jQuery(".CS").click();
        break;
      case "PG":
        jQuery(".POS").click();
        break;
      default:
        break;

    }//Fin del switch


  }// Fin del metodo

  seleccionarLinea(event)
  {
    if(jQuery("#formApp").data("linea") == "" || typeof jQuery("#formApp").data("linea") == "undefined"){

            console.log("No ha seleccionado la linea de negocio: " + typeof jQuery("#formApp").data("linea"));
            //(".app-menu-title").addClass("parpadea");
            jQuery( ".app-menu-title" ).addClass("parpadea");
            jQuery( "#divisor-menu-app" ).addClass("hr-error");
            jQuery( "#divisor-menu-app" ).addClass("parpadea");
            setTimeout(function(){
                jQuery( ".app-menu-title" ).removeClass( "parpadea" );
                jQuery( "#divisor-menu-app" ).removeClass("parpadea");
                jQuery( "#divisor-menu-app" ).removeClass("hr-error");  
                
            },1000);

            //jQuery('.col-error-app').html(this.error_estado);
            //jQuery('.row-error-app').show();
            //.app-menu-title


        } else {

            console.log("Avanza a productos");
            //Asignar a las flechas los eventos que corresponden
            jQuery(".app-left-arrow").unbind("click");
            jQuery(".app-left-arrow").bind("click",(event) => this.muestraLineasDeNegocio(event));
    
            //jQuery(".app-rigth-arrow").unbind("click");
            //jQuery(".app-rigth-arrow").bind("click",(event) => this.(event, jQuery("#formApp").data("linea")));


            //Ocultamos el selector actual
            jQuery("#secLineasNegocio").hide('slow');
            //Mostramos el siguiente selector
            jQuery("#secProductos").show('slow');

        }
  }

  //Seleccionar estado
  seleccionarEstado(event)
  {
    
    console.log("METODO seleccionarEstado(event) en frm-estado-expuesto.component.ts");
    //Mostramos el siguiente selector
    jQuery("#secLineasNegocio").hide('slow');
    //Ocultar flecha para regresar y quitarle el evento click
    jQuery(".app-left-arrow").unbind("click");
    //jQuery(".app-rigth-arrow").unbind("click");
    //jQuery(".app-rigth-arrow").bind("click",(event) => this.muestraLineasDeNegocio(event));
    jQuery(".app-left-arrow").css("visibility", "hidden");


    //Ocultamos el selector actual
    jQuery(".col-estados").show('slow');
    jQuery(".app-menu-title").html(this.titulo_estado);
        
  }

}//Fin de la clase