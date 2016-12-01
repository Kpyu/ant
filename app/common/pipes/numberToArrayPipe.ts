import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberToArray' })
export class NumberToArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    let res: number[] = [];
    for (let i = 0; i < value; i++) {
      res.push(i + 1);
    }
    return res;
  }
}
