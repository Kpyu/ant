import { Component, OnInit } from '@angular/core';

// const $ = window.document.querySelector;
@Component({
    // moduleId: module.id,
    selector: 'cms-app',
    templateUrl: 'app.component.html',
    // template:'<hero-form></hero-form>',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    public collapse: boolean = false;
    public state: string = 'active';
    ngOnInit() {
    }
    onCollpase(toggle: boolean) {
        this.collapse = toggle;
        this.state = toggle ? 'active' : 'inactive';
    }

}