import { Injectable } from '@angular/core';
import Logger from '../logger.service';
import { HEROES } from './mock-heroes';
@Injectable()
export class HeroService {
  constructor(private logger: Logger) { };
  getHeros() {
    this.logger.log('getting heroes');
    return
  }
}