import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Routes
import { AppRouting } from './app.routing';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NuevoRegistroComponent } from './nuevo-registro/nuevo-registro.component';
import { NuevoRegistroSolovinoComponent } from './nuevo-registro-solovino/nuevo-registro-solovino.component';

// Providers
import { CsqService } from './providers/csq.service';
import { HoraService } from './providers/hora.service';
import { NivelService } from './providers/nivel.service';
import { CanalService } from './providers/canal.service';
import { CicloService } from './providers/ciclo.service';
import { CampusService } from './providers/campus.service';
import { AsesorService } from './providers/asesor.service';
import { InteresService } from './providers/interes.service';
import { CarreraService } from './providers/carrera.service';
import { ModalidadService } from './providers/modalidad.service';
import { ParentescoService } from './providers/parentesco.service';
import { TipificacionService } from './providers/tipificacion.service';

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
    NuevoRegistroSolovinoComponent
  ],
  imports: [
    HttpModule,
    AppRouting,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    [MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule],
    BrowserAnimationsModule
  ],
  providers: [CanalService, CsqService, TipificacionService, InteresService,
              ParentescoService, CampusService, NivelService, ModalidadService,
              CarreraService, CicloService, AsesorService, HoraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
