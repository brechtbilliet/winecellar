import {Component, Output, EventEmitter, Input} from "@angular/core";
import {Credentials} from "../../types/Credentials";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
    selector: "login",
    template: `
        <form [formGroup]="loginForm" class="form-horizontal">
            <form-group-textbox [label]="'Login (*)'"
                                [control]="loginForm.controls['login']" [placeholder]="'Enter login'">
            </form-group-textbox>
            <form-group-password [label]="'Password (*)'" [control]="loginForm.controls['password']"
                                 [placeholder]="'Enter password'">
            </form-group-password>
            <form-group-footer>
                <button type="submit" [disabled]="!loginForm.valid || isBusy" (click)="onSubmit()" class="btn btn-primary btn-block btn-lg">
                    <i class="fa fa-sign-in"></i>&nbsp;Sign in
                </button>
            </form-group-footer>
        </form>
`
})
export class LoginComponent {
    @Output() authenticate = new EventEmitter<Credentials>();
    @Input() isBusy: boolean;

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