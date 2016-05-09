import {Component, Input, ChangeDetectionStrategy} from "angular2/core";
import {Control} from "angular2/common";
@Component({
    selector: "form-group-password",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
            <label class="col-sm-4 control-label">{{label}}</label>
             <div class="col-sm-8">
                <input type="password" 
                    [ngFormControl]="control" 
                    class="form-control input-lg" 
                    placeholder="{{placeholder}}"/>
                    <span *ngIf="control.valid" 
                    class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
            </div>
        </div>
    `
})
export class FormGroupPassword {
    @Input() public control: Control;
    @Input() public label: string;
    @Input() public placeholder: string;
}