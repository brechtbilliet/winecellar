import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {hotModuleReplacement} from "./hot-store";
import {DevModule} from "./dev.module";
hotModuleReplacement(() => platformBrowserDynamic().bootstrapModule(DevModule), module);
