import {Product} from "../../stock/WineComApiTypes";
import {ApplicationState} from "./ApplicationState";

export const INITIAL_STATE: ApplicationState = {
    containers: {
        editWinePage: {
            wine: null
        },
        application: {
            isBusy: false
        },
        collapsableSidebar: {
            isCollapsed: false
        },
        wineSearch: {
            foundWines: new Array<Product>()
        }
    },
    data: {
        authentication: {
            isAuthenticated: false,
            jwtToken: "",
            account: null
        },
        wines: []
    }
};


// component structure myWinesPage
// -application [Smart]
//      -navbar [dumb]
//      -spinner [dumb]
//      -authentication [Smart]
//      -protected [Smart]
//          -myWinesPage [Smart]
//              -defaultPage [dumb]
//                  -collapsableSidebar [Smart]
//                      -favorites [dumb]
//                          -numberPicker [dumb]
//                  -main [dumb]
//                      -wineResults [dumb]
//                          -numberPicker [dumb]
//                          -rating [dumb]