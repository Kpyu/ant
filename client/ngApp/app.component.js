import { Component } from '@angular/core';
export var AppComponent = (function () {
    function AppComponent() {
        this.showHeading = true;
        this.heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];
    }
    AppComponent.prototype.toggleHeading = function () {
        this.showHeading = !this.showHeading;
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-app',
                    templateUrl: 'app.component.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = [];
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map