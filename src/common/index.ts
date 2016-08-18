import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {DefaultPage} from "./components/default-page/default-page.component";
import {FormGroupContent} from "./components/form/form-group-content/form-group-content.component";
import {FormGroupFooter} from "./components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "./components/form/form-group-password/form-group-password.component";
import {FormGroupTextarea} from "./components/form/form-group-textarea/form-group-textarea.component";
import {FormGroupTextbox} from "./components/form/form-group-textbox/form-group-textbox.component";
import {Main} from "./components/main/main.component";
import {Navbar} from "./components/navbar/navbar.component";
import {NumberPicker} from "./components/number-picker/number-picker.component";
import {Panel} from "./components/panel/panel.component";
import {Rating} from "./components/rating/rating.component";
import {Spinner} from "./components/spinner/spinner.component";
import {CollapsableSidebar} from "./containers/collapsable-sidebar/collapsable-sidebar.container";
import {CollapsableSidebarSandbox} from "./sandboxes/collapsable-sidebar.sandbox";
import {BusyHandlerService} from "./services/busyHandler.service";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AuthenticatedGuard} from "./authenticated.guard";
import {UnauthenticatedGuard} from "./unauthenticated.guard";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, HttpModule],
    declarations: [DefaultPage, FormGroupContent, FormGroupFooter, FormGroupPassword, FormGroupTextarea, FormGroupTextbox,
        Main, Navbar, NumberPicker, Panel, Rating, Spinner, CollapsableSidebar],
    exports: [DefaultPage, FormGroupContent, FormGroupFooter, FormGroupPassword, FormGroupTextarea, FormGroupTextbox,
        Main, Navbar, NumberPicker, Panel, Rating, Spinner, CollapsableSidebar],
    providers: [CollapsableSidebarSandbox, BusyHandlerService, AuthenticatedGuard, UnauthenticatedGuard]
})
export class CommonLogicModule {
}

