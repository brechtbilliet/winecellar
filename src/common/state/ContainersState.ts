import {Wine} from "../../stock/entities/Wine";
import {Product} from "../../stock/WineComApiTypes";

export interface ContainersState {
    editWinePage: EditWineContainerState;
    application: ApplicationContainerState;
    wineSearch: WineSearchContainerState;
    collapsableSidebar: CollapsableSidebarContainerState;
}

export interface EditWineContainerState {
    wine: Wine;
}

export interface ApplicationContainerState {
    isBusy: boolean;
}

export interface CollapsableSidebarContainerState {
    isCollapsed: boolean;
}

export interface WineSearchContainerState {
    foundWines: Array<Product>;
}