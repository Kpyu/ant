import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService, UserService } from './api';
import * as pipes from './pipes';
const pipesArr: Array<any> = Object.keys(pipes)
pipesArr.forEach((val, index) => {
    pipesArr[index] = pipes[val];
});
@NgModule({
    imports: [
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    providers: [UserService, InMemoryDataService],
    declarations: [
        // ...pipesArr,
    ],
    exports: [],
})
export class CommonModule { };
