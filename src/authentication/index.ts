import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthenticationService} from "./services/authentication.service";
import {AuthenticationSandbox} from "./sandboxes/authentication.sandbox";
import {Authentication} from "./containers/authentication/authentication.container";
import {Login} from "./components/login/login.component";
import {Register} from "./components/register/register.component";
import {CommonLogicModule} from "../common/index";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./routes";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, HttpModule, CommonLogicModule, routing],
    declarations: [Authentication, Login, Register],
    exports: [Authentication],
    providers: [AuthenticationService, AuthenticationSandbox]
})
export class AuthenticationModule {
}

