import {enableProdMode} from "@angular/core";
import {platformBrowser} from "@angular/platform-browser";

enableProdMode();
platformBrowser().bootstrapModuleFactory(require("../../out_aot/src/setup/prod.module.ngfactory").ProdModuleNgFactory);
