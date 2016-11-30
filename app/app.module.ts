import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroFormComponent } from './hero/hero-form.component';
import { SiderBarComponent } from './siderBar/siderBar-component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [],
  declarations: [
    AppComponent,
    HeroFormComponent,
    HeaderComponent,
    SiderBarComponent,
  ],
  // exports: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
