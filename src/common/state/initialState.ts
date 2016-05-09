import {ApplicationState} from "./ApplicationState";

export const INITIAL_STATE: ApplicationState = {
    containers: {
        editStockPage: {
            wine: null
        },
        application: {
            isBusy: false
        },
        collapsableSidebar: {
            isCollapsed: false
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
