import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { AppComponent } from './app.component';
import {ErrorStateMatcher} from '@angular/material/core';
import { CreateContacComponent } from './contacto/create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, 
  MatExpansionModule, MatDatepickerModule, MatInputModule, MatTabsModule, 
  MatTooltipModule, MatFormFieldModule, MatMenuModule, MatSnackBarModule,MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CreateContacComponent
  ],
  imports: [
    [BrowserAnimationsModule],       
    [MatSelectModule,MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatMenuModule, 
      MatExpansionModule, MatInputModule, MatTabsModule, MatTooltipModule, MatFormFieldModule,
      MatSnackBarModule],
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
