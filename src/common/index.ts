import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {DefaultPageComponent} from "./components/default-page/default-page.component";
import {FormGroupContent} from "./components/form/form-group-content/form-group-content.component";
import {FormGroupFooter} from "./components/form/form-group-footer/form-group-footer.component";
import {FormGroupPassword} from "./components/form/form-group-password/form-group-password.component";
import {FormGroupTextarea} from "./components/form/form-group-textarea/form-group-textarea.component";
import {FormGroupTextbox} from "./components/form/form-group-textbox/form-group-textbox.component";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NumberPickerComponent} from "./components/number-picker/number-picker.component";
import {PanelComponent} from "./components/panel/panel.component";
import {Rating} from "./components/rating/rating.component";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {CollapsableSidebarContainer} from "./containers/collapsable-sidebar/collapsable-sidebar.container";
import {CommonSandbox} from "./common.sandbox";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AuthenticatedGuard} from "./authenticated.guard";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, HttpModule],
    declarations: [DefaultPageComponent, FormGroupContent, FormGroupFooter, FormGroupPassword, FormGroupTextarea, FormGroupTextbox,
        MainComponent, NavbarComponent, NumberPickerComponent, PanelComponent, Rating, SpinnerComponent, CollapsableSidebarContainer],
    exports: [DefaultPageComponent, FormGroupContent, FormGroupFooter, FormGroupPassword, FormGroupTextarea, FormGroupTextbox,
        MainComponent, NavbarComponent, NumberPickerComponent, PanelComponent, Rating, SpinnerComponent, CollapsableSidebarContainer],
    providers: [CommonSandbox, AuthenticatedGuard]
})
export class CommonLogicModule {
}

