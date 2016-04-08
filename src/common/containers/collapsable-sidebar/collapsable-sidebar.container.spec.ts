import {
    injectAsync,
    TestComponentBuilder,
    ComponentFixture,
    beforeEachProviders,
    setBaseTestProviders,
    it,
    describe, resetBaseTestProviders
} from "angular2/testing";
import {CollapsableSidebar} from "./collapsable-sidebar.container";
import {provide, Component,} from "angular2/core";
import {Store} from "@ngrx/store";
import {TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from "angular2/platform/testing/browser";
import {ApplicationState} from "../../state/ApplicationState";
import Spy = jasmine.Spy;
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
describe("component: collapsable-sidebar", () => {
    let storeMock: Store<ApplicationState> = jasmine.createSpyObj("store", ["select"]);
    let isCollapsedMock$: Observable<boolean>;

    resetBaseTestProviders();
    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
    beforeEachProviders(() => [
        CollapsableSidebar,
        provide(Store, {useValue: storeMock})
    ]);
    describe("on init", () => {
        describe("given the isCollapsed state is false", () => {
            it("should should not collapse the sidebar", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                isCollapsedMock$ = new Observable((observer: Observer<boolean>) => {
                    observer.next(false);
                });
                (<Spy>storeMock.select).and.returnValue(isCollapsedMock$);
                return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    componentFixture.detectChanges();
                    expect(element.querySelectorAll(".is-collapsed").length).toBe(0);
                    expect(element.querySelectorAll(".rendered").length).toBe(1);
                });
            }));
        });
        describe("given the isCollapsed state is true", () => {
            it("should collapse the sidebar", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                isCollapsedMock$ = new Observable((observer: Observer<boolean>) => {
                    observer.next(true);
                });
                (<Spy>storeMock.select).and.returnValue(isCollapsedMock$);
                return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    componentFixture.detectChanges();
                    expect(element.querySelectorAll(".is-collapsed").length).toBe(1);
                    expect(element.querySelectorAll(".rendered").length).toBe(0);
                });
            }));
        });
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