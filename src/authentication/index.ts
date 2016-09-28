import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthenticationService} from "./services/authentication.service";
import {AuthenticationSandbox} from "./authentication.sandbox";
import {AuthenticationContainer} from "./containers/authentication/authentication.container";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CommonLogicModule} from "../common/index";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, HttpModule, CommonLogicModule],
    declarations: [AuthenticationContainer, LoginComponent, RegisterComponent],
    exports: [AuthenticationContainer],
    providers: [AuthenticationService, AuthenticationSandbox]
})
export class AuthenticationModule {
}

