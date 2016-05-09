import {Wine} from "../../stock/entities/Wine";

export interface ContainersState {
    editStockPage: EditStockContainerState;
    application: ApplicationContainerState;
    collapsableSidebar: CollapsableSidebarContainerState;
}

export interface EditStockContainerState {
    wine: Wine;
}

export interface ApplicationContainerState {
    isBusy: boolean;
}

export interface CollapsableSidebarContainerState {
    isCollapsed: boolean;
}
