import {ROUTER_DIRECTIVES} from "angular2/router";
import {Component, Output, EventEmitter, Input, ChangeDetectionStrategy} from "angular2/core";
import {Account} from "../../../authentication/types/Account";
@Component({
    selector: "navbar",
    directives: [ROUTER_DIRECTIVES],
    styles: [require("./navbar.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" 
                        data-toggle="collapse" 
                        data-target="#navbar" 
                        aria-expanded="false" 
                        aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" [routerLink]="['MyWines']"><i class="fa fa-glass"></i>&nbsp;Wine cellar</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['MyWines']"><i class="fa fa-user"></i>&nbsp;My wines</a></li>
                        <li><a [routerLink]="['About']" ><i class="fa fa-info-circle"></i>&nbsp;About</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="navbar-text hidden-sm hidden-xs hidden-md">
                            Welcome {{account.firstName}} {{account.lastName}}
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" 
                            aria-haspopup="true" aria-expanded="false">Menu <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="javascript: void(0)" (click)="logoutClicked()">
                                        <i class="fa fa-sign-out"></i>&nbsp;Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`
})
export class Navbar {
    @Output() public logout: EventEmitter<any>;

    @Input() public account: Account;

    constructor() {
        this.logout = new EventEmitter();
    }

    public logoutClicked(): void {
        this.logout.emit(null);
    }
}