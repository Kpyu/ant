import { Component } from '@angular/core';
import { Hero } from './hero';
@Component({
  moduleId: 'heroForm',
  selector: 'hero-form',
  templateUrl: 'hero-form-component.html',
  styles:['hero-form-component.css']
})
export class HeroFormComponent{
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'weather changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'chuck Overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  active = true;
  newHero() {
    this.model = new Hero(42, '', '');
    this.active = true;
    setTimeout(() => this.active = true, 0);
  }
}