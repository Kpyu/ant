import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BrowserModule],
                    // providers:    [ Logger ],
                    declarations: [AppComponent],
                    exports: [AppComponent],
                    bootstrap: [AppComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map