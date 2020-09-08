import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskComponent } from './task/task.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BatchComponent } from './batch/batch.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

import { MatTabsModule } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AddRowDirective } from "./directives/add-row.directive";
import { ObjectComponent } from './object/object.component';
import { ObjectTaskComponent } from './object-task/object-task.component';


import { AttributeComponent } from './attribute/attribute.component'



@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HeaderComponent,
    FooterComponent,
    BatchComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    AddRowDirective,
    ObjectComponent,
    ObjectTaskComponent,
    
    AttributeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    TableModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
		SliderModule,
		ConfirmDialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
