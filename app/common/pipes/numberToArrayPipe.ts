import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberToArray' })
export class NumberToArrayPipe implements PipeTransform {
    transform(value: number, scale: number, start: number): number[] {
        let res: number[] = [];
        if (value <= scale) {
            for (let i = 0; i < value; i++) {
                res.push(i + 1);
            }
        } else {
            if (start <= scale) {
                for (let i = 0; i < scale; i++) {
                    res.push(i + 1);
                }
            } else {
                let n = Math.floor(start / scale);
                if (n * scale === start) {
                    for (let i = (n - 1) * scale + 1; i <= n * scale; i++) {
                        res.push(i);
                    }
                } else {
                    for (let i = n * scale + 1; i <= (n + 1) * scale; i++) {
                        res.push(i);
                    }
                }

            }
        }
        return res;
    }
}
