import {enableProdMode} from "@angular/core";
import {ProdModuleNgFactory} from "./prod.ngfactory";
import {platformBrowser} from "@angular/platform-browser";
enableProdMode();
platformBrowser().bootstrapModuleFactory(ProdModuleNgFactory);
