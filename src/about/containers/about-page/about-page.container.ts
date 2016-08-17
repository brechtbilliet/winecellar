import {Component} from "@angular/core";
@Component({
    selector: "about-page",
    template: `
        <default-page>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h1><i class="fa fa-info-circle"></i>&nbsp;About</h1>
                        <p>
                            This project is created by <a href="http://brecht.io" target="blank">Brecht Billiet</a>
                            to use in an angular2 workshop.
                        </p>
                        <p>
                            This project uses the following <strong>core technologies</strong>:
                        </p>
                        <ul>
                            <li>Angular2</li>
                            <li>Rxjs</li>
                            <li>Redux architecture</li>
                            <li>@ngrx/store</li>
                            <li>Typescript</li>
                            <li>Webpack</li>
                        </ul>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class AboutPage {
}
