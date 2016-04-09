import {
    injectAsync,
    TestComponentBuilder,
    ComponentFixture,
    beforeEachProviders,
    setBaseTestProviders,
    it,
    describe,
    resetBaseTestProviders
} from "angular2/testing";
import {CollapsableSidebar} from "./collapsable-sidebar.container";
import {provide, Component} from "angular2/core";
import {Store} from "@ngrx/store";
import {TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from "angular2/platform/testing/browser";
import {ApplicationState} from "../../state/ApplicationState";
import {Observable} from "rxjs";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
import {Observer} from "rxjs/Observer";
import {INITIAL_STATE} from "../../state/initialState";
describe("component: collapsable-sidebar", () => {
    let storeMock: Store<ApplicationState> = jasmine.createSpyObj("store", ["dispatch"]);
    let isCollapsedMock$: Observable<boolean>;
    let state: ApplicationState = Object.assign({}, INITIAL_STATE);
    storeMock.select = <any>function (cb: Function): Observable<boolean> {
        isCollapsedMock$ = Observable.create((observer: Observer<boolean>) => {
            observer.next(cb(state));
        });
        return isCollapsedMock$;
    };
    resetBaseTestProviders();
    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
    beforeEachProviders(() => [
        CollapsableSidebar,
        provide(Store, {useValue: storeMock})
    ]);
    describe("on init", () => {
        describe("given the isCollapsed state is false", () => {
            it("should should not collapse the sidebar", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                state.containers.collapsableSidebar.isCollapsed = false;
                return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    componentFixture.detectChanges();
                    expect(element.querySelectorAll(".is-collapsed").length).toBe(0);
                    expect(element.querySelectorAll(".rendered").length).toBe(1);
                    expect(element.querySelectorAll(".fa-chevron-left").length).toBe(1);
                });
            }));
        });
        describe("given the isCollapsed state is true", () => {
            it("should collapse the sidebar", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                state.containers.collapsableSidebar.isCollapsed = true;
                return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    componentFixture.detectChanges();
                    expect(element.querySelectorAll(".is-collapsed").length).toBe(1);
                    expect(element.querySelectorAll(".rendered").length).toBe(0);
                    expect(element.querySelectorAll(".fa-chevron-right").length).toBe(1);
                });
            }));
        });
    });
    describe("on toggleSidebar()", () => {
        it("should dispatch the correct event to the store", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
                let component: CollapsableSidebar = componentFixture.debugElement.children[0].componentInstance;
                component.toggleSidebar();
                expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
            });
        }));
    });
});

@Component({
    directives: [CollapsableSidebar],
    template: `
        <collapsable-sidebar><div class="rendered"></div></collapsable-sidebar>
    `
})
class CollapsableSidebarWrapper {
}