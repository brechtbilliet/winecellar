import {Component, Output, EventEmitter, Input} from "@angular/core";
import {Account} from "../../types/Account";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
    selector: "register",
    styles: [require("./register.component.scss")],
    template: `
        <div class="form-horizontal">
            <form-group-textbox [label]="'First name (*)'" [control]="registerForm.controls.firstName" 
                [placeholder]="'Enter first name'">
            </form-group-textbox>
            <form-group-textbox [label]="'Last name (*)'"  [control]="registerForm.controls.lastName" 
                [placeholder]="'Enter last name'">
            </form-group-textbox>
            <form-group-textbox [label]="'Login (*)'" [control]="registerForm.controls.login" 
                [placeholder]="'Enter login'">
            </form-group-textbox>
            <form-group-password [label]="'Password (*)'" [control]="registerForm.controls.password" 
                [placeholder]="'Enter password'">
            </form-group-password>
            <form-group-password [label]="'Confirm password (*)'" [control]="registerForm.controls.confirmPassword" 
                [placeholder]="'Confirm your password'">
            </form-group-password>
            <form-group-footer>
                <button type="submit" [disabled]="!registerForm.valid || isBusy" 
                    class="btn btn-primary btn-block btn-lg" (click)="onSubmit()">
                    <i class="fa fa-user"></i>&nbsp;Sign up
                </button>
            </form-group-footer>
        </div>
       `
})
export class RegisterComponent {
    @Output() authenticate = new EventEmitter<Account>();
    @Input() isBusy: boolean;

    registerForm = this.formBuilder.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        login: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
    });

    constructor(private formBuilder: FormBuilder) {
    }

    onSubmit(): void {
        if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
            toastr.error("Passwords don't match");
        } else {
            this.authenticate.emit(this.registerForm.value);
        }
    }
}