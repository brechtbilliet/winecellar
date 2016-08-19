import {Component} from "@angular/core";
@Component({
    selector: "main",
    styles: [require("./main.component.scss")],
    template: `<ng-content></ng-content>`
})
export class MainComponent {
}