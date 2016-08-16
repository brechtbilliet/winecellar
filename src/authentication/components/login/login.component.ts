import {Component, Output, EventEmitter} from "@angular/core";
import {Credentials} from "../../types/Credentials";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "../../../common/components/form/form-group-password/form-group-password.component";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
    selector: "login",
    styles: [require("./login.component.scss")],
    providers: [FormBuilder],
    directives: [FormGroupTextbox, FormGroupPassword, FormGroupFooter],
    template: `
        <div class="form-horizontal">
            <form-group-textbox [label]="'Login (*)'"
                                [control]="loginForm.controls.login" [placeholder]="'Enter login'">
            </form-group-textbox>
            <form-group-password [label]="'Password (*)'" [control]="loginForm.controls.password"
                                 [placeholder]="'Enter password'">
            </form-group-password>
            <form-group-footer>
                <button type="button" [disabled]="!loginForm.valid" class="btn btn-primary btn-block btn-lg" (click)="onSubmit()">
                    <i class="fa fa-sign-in"></i>&nbsp;Sign in
                </button>
            </form-group-footer>
        </div>
               `
})
export class Login {
    @Output() authenticate = new EventEmitter<Credentials>();

    loginForm = this.formBuilder.group({
        login: ["", Validators.required],
        password: ["", Validators.required]
    });

    constructor(private formBuilder: FormBuilder) {
    }

    onSubmit(): void {
        this.authenticate.emit(this.loginForm.value);
    }
}