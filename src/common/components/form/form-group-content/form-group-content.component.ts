import {Input, Component, ChangeDetectionStrategy} from "@angular/core";
@Component({
    selector: "form-group-content",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback">
            <label class="col-sm-4 control-label">{{label}}</label>
            <div class="col-sm-8">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class FormGroupContent {
    @Input() public label:string;
}