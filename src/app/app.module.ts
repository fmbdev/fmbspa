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
import { NewRegisterPromotionComponent } from './new-register-promotion/new-register-promotion.component';
import { SearchComponent } from './search/search.component';
import { UploadBaseComponent } from './upload-base/upload-base.component';
import { UploadBaseSisComponent } from './upload-base-sis/upload-base-sis.component';
import { LoginComponent } from './login/login.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { NewRegisterSoloComponent } from './new-register-solo/new-register-solo.component';
import { SearchInboundComponent } from './search-inbound/search-inbound.component';

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
import { GeneralService } from './services/general.service';
import { LandingService } from './services/landing.service';

import { AppConfig } from './services/constants';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { HomeComponent } from './home/home.component';
import { ReferidoReferenteComponent } from './referido-referente/referido-referente.component';
import { ReferidoPromotorComponent } from './referido-promotor/referido-promotor.component';
import { ReferidoTlmkComponent } from './referido-tlmk/referido-tlmk.component';
import { ReferidoWebComponent } from './referido-web/referido-web.component';
import { NewRegisterExistingComponent } from './new-register-existing/new-register-existing.component';
import { NewRegisterExistingReceptionComponent } from './new-register-existing-reception/new-register-existing-reception.component';
import { FormComponent } from './form/form.component';


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
    ReferidoReferenteComponent,
    ReferidoPromotorComponent,
    ReferidoTlmkComponent,
    ReferidoWebComponent,
    NewRegisterExistingComponent,
    NewRegisterExistingReceptionComponent,
    FormComponent
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
    TipoReferenteService, TransferenciaService, TurnoService, UsuarioService, AppConfig, GeneralService, LandingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
