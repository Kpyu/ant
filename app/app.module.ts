import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { HeroFormComponent } from './hero/hero-form.component';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/less/bootstrap.less';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  // providers:    [ Logger ],
  declarations: [
    AppComponent,
    HeroFormComponent
  ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }