import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Routes
import { AppRouting } from './app.routing';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NuevoRegistroComponent } from './nuevo-registro/nuevo-registro.component';
import { NuevoRegistroSolovinoComponent } from './nuevo-registro-solovino/nuevo-registro-solovino.component';
import { GeneralComponent } from './general/general.component';
import { ReferidosComponent } from './referidos-referente/general.component';
import { ReferidosPromotorComponent } from './referidos-promotor/referidos-promotor.component';
import { ReferidosTlmkComponent } from './referidos-tlmk/referidos-tlmk.component';
import { ReferidosWebComponent } from './referidos-web/referidos-web.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BusquedaInboundComponent } from './busqueda-inbound/busqueda-inbound.component';

import { LoginComponent } from './login/login.component';
import { RegistrarPromocionComponent } from './registrar-promocion/registrar-promocion.component';
import { SearchResultsComponent } from './busqueda-resultados/search-results.component';


import { GeneralService } from './services/general.service';
import { AppConfig } from './services/constants';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';


// Providers
import { CsqService } from './providers/csq.service';
import { HoraService } from './providers/hora.service';
import { NivelService } from './providers/nivel.service';
import { CanalService } from './providers/canal.service';
import { CicloService } from './providers/ciclo.service';
import { CampusService } from './providers/campus.service';
import { EquiService } from './providers/equi.service';
import { AsesorService } from './providers/asesor.service';
import { InteresService } from './providers/interes.service';
import { CarreraService } from './providers/carrera.service';
import { ModalidadService } from './providers/modalidad.service';
import { ParentescoService } from './providers/parentesco.service';
import { TipificacionService } from './providers/tipificacion.service';
import { ValidationService } from './validations/validation.service'; 
import { PalabramalaService } from './providers/palabramala.service';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NuevoRegistroComponent,
    NuevoRegistroSolovinoComponent,
    GeneralComponent,
    ReferidosComponent,
    ReferidosPromotorComponent,
    ReferidosTlmkComponent,
    ReferidosWebComponent,
    BusquedaComponent,
    BusquedaInboundComponent,
    LoginComponent,
    RegistrarPromocionComponent,
    SearchResultsComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    AppRouting,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    [MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule],
    BrowserAnimationsModule
  ],
  providers: [CanalService, CsqService, TipificacionService, InteresService,
    ParentescoService, ValidationService, CampusService,EquiService, NivelService, ModalidadService,
    CarreraService, CicloService, AsesorService, HoraService, PalabramalaService,AppConfig, GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
