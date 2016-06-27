export interface ContainersState {
    application: ApplicationContainerState;
    collapsableSidebar: CollapsableSidebarContainerState;
}

export interface ApplicationContainerState {
    isBusy: boolean;
}

export interface CollapsableSidebarContainerState {
    isCollapsed: boolean;
}
