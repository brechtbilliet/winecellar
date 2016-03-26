import {WineEndpoint} from "../../endpoints/WineEndpoint";
import {Wine} from "../../entities/Wine";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {DetailWine} from "../../components/detail-wine/detail-wine.component";
import {Component, ChangeDetectionStrategy, OnDestroy} from "angular2/core";
import {Router} from "angular2/router";
import {Subscription} from "rxjs/Subscription";
@Component({
    selector: "add-wine-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [DetailWine, DefaultPage, Main],
    providers: [WineEndpoint],
    template: `
        <default-page>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h1><i class="fa fa-plus-circle"></i>&nbsp;Add wine</h1>
                    </div>
                </div>
                <div class="row">
                    <detail-wine (onSave)="onSave($event)"></detail-wine>
                </div>
            </main>
        </default-page>
  `
})
export class AddWinePage implements OnDestroy {
    private subscription: Subscription;

    constructor(private wineEndpoint: WineEndpoint,
                private router: Router) {
    }

    public onSave(wine: Wine): void {
        this.subscription = this.wineEndpoint.add(wine).subscribe(() => {
            this.router.navigateByUrl("/stock");
        });
    }

    public ngOnDestroy(): any {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}