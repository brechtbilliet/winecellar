import {Register} from "../register/register.container";
import {Login} from "../login/login.container";
import {Panel} from "../../../common/components/panel/panel.component";
import {Component, ChangeDetectionStrategy} from "angular2/core";
import {ApplicationState} from "../../../common/state/ApplicationState";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

@Component({
    selector: "authentication",
    directives: [Login, Register, Panel],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="container" *ngIf="!(isAuthenticated$| async)">
            <panel [header]="'You need authentication'">
                <login *ngIf="curTab === 0"></login>
                <register *ngIf="curTab === 1"></register>
                <a href="javascript:void(0)" (click)="enableTab(1)" *ngIf="curTab===0">I don't have an account yet</a>
                <a href="javascript:void(0)" (click)="enableTab(0)" *ngIf="curTab===1">I have an account already</a>
            </panel>
        </div>
       `
})
export class Authentication {
    public curTab: number = 0;

    public isAuthenticated$: Observable<boolean>;

    public enableTab(tabIndex: number): void {
        this.curTab = tabIndex;
    }

    constructor(private store: Store<ApplicationState>) {
        this.isAuthenticated$ = this.store.select((item: ApplicationState) => item.data.authentication.isAuthenticated);
    }
}