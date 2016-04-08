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
    beforeEach(() => {
        isCollapsedMock$ = new Observable((observer: Observer<boolean>) => {
            observer.next(false);
        });
        (<Spy>storeMock.select).and.returnValue(isCollapsedMock$);
    })
    beforeEachProviders(() => [
        CollapsableSidebar,
        provide(Store, {useValue: storeMock})
    ]);
    describe("on init", () => {
        describe("given the isCollapsed state is false", () => {
            it("should render based on the state of the store", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    componentFixture.detectChanges();

                    expect(element.querySelectorAll(".is-collapsed").length).toBe(0);
                });
            }));
        });
        // describe("given the isCollapsed state is true", () => {
        //     it("should render based on the state of the store", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        //         return tcb.createAsync(CollapsableSidebarWrapper).then((componentFixture: ComponentFixture) => {
        //             const element: any = componentFixture.nativeElement;
        //             componentFixture.detectChanges();
        //             expect(element.querySelectorAll(".is-collapsed").length).toBe(1);
        //         });
        //     }));
        // });
    });
});

@Component({
    directives: [CollapsableSidebar],
    template: `
        <collapsable-sidebar>test</collapsable-sidebar>
    `
})
class CollapsableSidebarWrapper {
}