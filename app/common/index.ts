import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuService, UserService } from './api';
import * as pipes from './pipes';

const pipesArr: Array<any> = Object.keys(pipes);
pipesArr.forEach((val, index) => {
    pipesArr[index] = pipes[val];
});
console.log(pipesArr);
@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [UserService, MenuService],
    declarations: [
        // ...pipesArr,
    ],
    exports: [],
})
export class SelfCommonModule { };
