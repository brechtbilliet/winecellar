import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {hotModuleReplacement} from "./hot-store";
import {DevModule} from "./dev";
hotModuleReplacement(() => platformBrowserDynamic().bootstrapModule(DevModule), module);
