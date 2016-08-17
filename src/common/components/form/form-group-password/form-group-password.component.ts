import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {FormControl} from "@angular/forms";
@Component({
    selector: "form-group-password",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
             <label class="col-sm-4 control-label">{{label}}</label>
             <div class="col-sm-8">
                <input type="password" 
                    [formControl]="control" 
                    class="form-control input-lg" 
                    placeholder="{{placeholder}}"/>
                    <span *ngIf="control.valid" 
                    class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
            </div>
        </div>
    `
})
export class FormGroupPassword {
    @Input() control: FormControl;
    @Input() label: string;
    @Input() placeholder: string;
}