import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {routing} from "./routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AboutPage} from "./containers/about-page/about-page.container";
import {CommonLogicModule} from "../common/index";

@NgModule({
    imports: [RouterModule, CommonModule, CommonLogicModule, HttpModule, routing],
    declarations: [AboutPage],
    providers: []
})
export class AboutModule {
}

