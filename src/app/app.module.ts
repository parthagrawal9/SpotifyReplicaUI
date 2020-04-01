import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { DataServiceService } from './data-service.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BasicauthhttpinterceptorService } from './basicauthhttpinterceptor.service';
import { NewSongFormComponent } from './new-song-form/new-song-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateFRParserFormatter } from './ngb-date-fr-parser-formatter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { NotifierModule } from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NewSongFormComponent
  ],
  imports: [
    NotifierModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    HttpModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    DataServiceService,
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicauthhttpinterceptorService, multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
