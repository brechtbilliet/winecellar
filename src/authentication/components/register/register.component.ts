import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/router-deprecated/src/facade/async";
import {Account} from "../../types/Account";
import {Validators, Control, ControlGroup} from "@angular/common";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "../../../common/components/form/form-group-password/form-group-password.component";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
@Component({
    selector: "register",
    styles: [require("./register.component.scss")],
    directives: [FormGroupTextbox, FormGroupPassword, FormGroupFooter],
    template: `
        <form class="form-horizontal" (ngSubmit)="onSubmit()">
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
                <button type="submit" [disabled]="!registerForm.valid" class="btn btn-primary btn-block btn-lg">
                    <i class="fa fa-user"></i>&nbsp;Sign up
                </button>
            </form-group-footer>
        </form>
       `
})
export class Register {
    @Output()
    public authenticate = new EventEmitter<Account>();

    public registerForm = new ControlGroup({
        "firstName": new Control("", Validators.required),
        "lastName": new Control("", Validators.required),
        "login": new Control("", Validators.required),
        "password": new Control("", Validators.required),
        "confirmPassword": new Control("", Validators.required)
    });

    public onSubmit(): void {
        if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
            toastr.error("Passwords don't match");
        } else {
            this.authenticate.emit(this.registerForm.value);
        }
    }
}