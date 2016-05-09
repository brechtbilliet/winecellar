import {Panel} from "../../../common/components/panel/panel.component";
import {ControlGroup, Validators, Control} from "angular2/common";
import {Output, EventEmitter, Component, ChangeDetectionStrategy} from "angular2/core";
import {Credentials} from "../../types/Credentials";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "../../../common/components/form/form-group-password/form-group-password.component";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
@Component({
    selector: "login",
    directives: [FormGroupTextbox, FormGroupPassword, FormGroupFooter, Panel],
    styles: [require("./login.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <form [ngFormModel]="loginForm" class="form-horizontal" (ngSubmit)="onSubmit()">
            <form-group-textbox [label]="'Login (*)'" [control]="loginForm.controls['login']" [placeholder]="'Enter login'">
            </form-group-textbox>
            <form-group-password [label]="'Password (*)'" [control]="loginForm.controls['password']" [placeholder]="'Enter password'">
            </form-group-password>
            <form-group-footer>
                 <button type="submit" [disabled]="!loginForm.valid" class="btn btn-primary btn-block btn-lg">
                    <i class="fa fa-sign-in"></i>&nbsp;Sign in
                </button>
            </form-group-footer>
        </form>
       `
})
export class Login {
    public loginForm: ControlGroup;

    @Output() public authenticate: EventEmitter<Credentials>;

    constructor() {
        this.authenticate = new EventEmitter();
        this.loginForm = new ControlGroup({
            "login": new Control("", Validators.required),
            "password": new Control("", Validators.required)
        });
    }

    public onSubmit(): void {
        this.authenticate.emit(this.loginForm.value);
    }
}