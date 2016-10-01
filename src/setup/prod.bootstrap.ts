import {enableProdMode} from "@angular/core";
import {platformBrowser} from "@angular/platform-browser";
import {ProdModuleNgFactory} from "./prod.module.ngfactory";

enableProdMode();
platformBrowser().bootstrapModuleFactory(ProdModuleNgFactory);
