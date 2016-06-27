import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/router-deprecated/src/facade/async";
import {Credentials} from "../../types/Credentials";
import {Validators, Control, ControlGroup} from "@angular/common";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "../../../common/components/form/form-group-password/form-group-password.component";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
@Component({
    selector: "login",
    styles: [require("./login.component.scss")],
    directives: [FormGroupTextbox, FormGroupPassword, FormGroupFooter],
    template: `
        <form class="form-horizontal" (ngSubmit)="onSubmit()">
            <form-group-textbox [label]="'Login (*)'"
                                [control]="loginForm.controls.login" [placeholder]="'Enter login'">
            </form-group-textbox>
            <form-group-password [label]="'Password (*)'" [control]="loginForm.controls.password"
                                 [placeholder]="'Enter password'">
            </form-group-password>
            <form-group-footer>
                <button type="submit" [disabled]="!loginForm.valid" class="btn btn-primary btn-block btn-lg"><i
                        class="fa fa-sign-in"></i>&nbsp;Sign in
                </button>
            </form-group-footer>
        </form>
               `
})
export class Login {
    @Output()
    public authenticate = new EventEmitter<Credentials>();

    public loginForm = new ControlGroup({
        "login": new Control("", Validators.required),
        "password": new Control("", Validators.required)
    });

    public onSubmit(): void {
        this.authenticate.emit(this.loginForm.value);
    }
}