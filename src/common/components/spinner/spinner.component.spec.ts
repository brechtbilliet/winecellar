import {
    setBaseTestProviders,
    resetBaseTestProviders,
    it,
    describe,
    expect,
    ComponentFixture,
    TestComponentBuilder,
    injectAsync
} from "angular2/testing";
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from "angular2/platform/testing/browser";
import {Spinner} from "./spinner.component";
describe("component: spinner", () => {
    resetBaseTestProviders();
    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
    describe("if the spin input is true", () => {
        it("should set the active class", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(Spinner).then((componentFixture: ComponentFixture) => {
                const element: any = componentFixture.nativeElement;
                componentFixture.componentInstance.spin = true;
                componentFixture.detectChanges();
                expect(element.querySelectorAll(".active").length).toBe(1);
            });
        }));
    });
    describe("if the spin input is false", () => {
        it("should not set the active class", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(Spinner).then((componentFixture: ComponentFixture) => {
                const element: any = componentFixture.nativeElement;
                componentFixture.componentInstance.spin = false;
                componentFixture.detectChanges();
                expect(element.querySelectorAll(".active").length).toBe(0);
            });
        }));
    });
});