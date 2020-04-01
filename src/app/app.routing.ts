import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';

import { AuthGaurdService } from './auth-gaurd.service';
import { NewSongFormComponent } from './new-song-form/new-song-form.component';
import { SignupComponent } from './examples/signup/signup.component';

const routes: Routes =[
    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'signup',             component: SignupComponent},  
    { path: 'home',             component: ComponentsComponent},
    { path: 'newsong',          component: NewSongFormComponent ,canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
