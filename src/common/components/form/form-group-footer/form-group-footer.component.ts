import {Component} from "@angular/core";
@Component({
    selector: "form-group-footer",
    template: `
        <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8">
               <ng-content></ng-content>
            </div>
        </div>
    `
})
export class FormGroupFooter {}