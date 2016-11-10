import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SiderBarComponent } from './siderBar/siderBar-component';

import { AppRoutingModule } from './app-routing.module';

import { HeroFormComponent } from './hero/hero-form.component';
import 'bootstrap/dist/css/bootstrap.css';

import 'admin-lte/dist/css/AdminLTE.css';

import 'admin-lte/dist/css/skins/skin-blue.css';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  // providers:    [ Logger ],
  declarations: [
    AppComponent,
    HeroFormComponent,
    HeaderComponent,
    SiderBarComponent,
  ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
