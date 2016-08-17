import {Component, Output, EventEmitter} from "@angular/core";
import {Credentials} from "../../types/Credentials";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
    selector: "login",
    styles: [require("./login.component.scss")],
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