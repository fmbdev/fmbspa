import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { MatTableModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './dialog/dialog.component';
import { NuevoRegistroComponent } from './nuevo-registro/nuevo-registro.component';
import { NuevoRegistroSolovinoComponent } from './nuevo-registro-solovino/nuevo-registro-solovino.component';
import { GeneralComponent } from './general/general.component';
import { ReferidosComponent } from './referidos-referente/general.component';
import { ReferidosPromotorComponent } from './referidos-promotor/referidos-promotor.component';
import { ReferidosTlmkComponent } from './referidos-tlmk/referidos-tlmk.component';
import { ReferidosWebComponent } from './referidos-web/referidos-web.component';

// Providers
import { CsqService } from './providers/csq.service';
import { PnnService } from './providers/pnn.service'; 
import { HoraService } from './providers/hora.service';
import { SendService } from './providers/send.service';
import { EquiService } from './providers/equi.service';
import { NivelService } from './providers/nivel.service';
import { CanalService } from './providers/canal.service';
import { CicloService } from './providers/ciclo.service';
import { TurnoService } from './providers/turno.service';
import { CampusService } from './providers/campus.service';
import { AsesorService } from './providers/asesor.service';
import { GeneroService } from './providers/genero.service';
import { InteresService } from './providers/interes.service';
import { CarreraService } from './providers/carrera.service';
import { UsuarioService } from './providers/usuario.service';
import { ModalidadService } from './providers/modalidad.service';
import { SinCorreoService } from './providers/sin-correo.service';
import { ParentescoService } from './providers/parentesco.service';
import { TerritorioService } from './providers/territorio.service';
import { CampusCitaService } from './providers/campus-cita.service';
import { ValidationService } from './validations/validation.service'; 
import { PalabramalaService } from './providers/palabramala.service';
import { ProgramacionService } from './providers/programacion.service';
import { TipificacionService } from './providers/tipificacion.service';
import { TransferenciaService } from './providers/transferencia.service';
import { PaginaLandingService } from './providers/pagina-landing.service';
import { TipoActividadService } from './providers/tipo-actividad.service';
import { TipoReferenteService } from './providers/tipo-referente.service';
import { EscuelaEmpresaService } from './providers/escuela-empresa.service';
import { CitaProspeccionService } from './providers/cita-prospeccion.service';
import { SubTipoActividadService } from './providers/sub-tipo-actividad.service';


@NgModule({
  declarations: [
    AppComponent,
    NewRegisterPromotionComponent,
    SearchComponent,
    SearchInboundComponent,
    UploadBaseComponent,
    UploadBaseSisComponent,
    LoginComponent,
    SearchResultsComponent,
    NewRegisterComponent,
    NewRegisterSoloComponent,
    ModalConfirmComponent,
    HomeComponent,
    NuevoRegistroComponent,
    NuevoRegistroSolovinoComponent,
    GeneralComponent,
    ReferidosComponent,
    ReferidosPromotorComponent,
    ReferidosTlmkComponent,
    ReferidosWebComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [CanalService, CsqService, TipificacionService, InteresService,
    ParentescoService, ValidationService, CampusService,EquiService, NivelService, ModalidadService,
    CarreraService, CicloService, AsesorService, HoraService, PalabramalaService, PnnService, SendService, 
    CampusCitaService, CitaProspeccionService, EscuelaEmpresaService, GeneroService, PaginaLandingService,
    ProgramacionService, SinCorreoService, SubTipoActividadService, TerritorioService, TipoActividadService,
    TipoReferenteService, TransferenciaService, TurnoService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
