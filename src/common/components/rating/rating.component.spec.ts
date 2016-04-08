import {setBaseTestProviders, resetBaseTestProviders} from "angular2/testing";
import {
    TEST_BROWSER_PLATFORM_PROVIDERS,
    TEST_BROWSER_APPLICATION_PROVIDERS
} from "angular2/platform/testing/browser";
import {
    it,
    describe,
    expect,
    ComponentFixture,
    TestComponentBuilder,
    injectAsync
} from "angular2/testing";
import {Rating} from "./rating.component";
describe("component: rating", () => {
    resetBaseTestProviders();
    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
    describe("when the rating property is set", () => {
        it("should set the correct stars to starred", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(Rating).then((componentFixture: ComponentFixture) => {
                const element: any = componentFixture.nativeElement;
                componentFixture.componentInstance.rating = 3;
                componentFixture.detectChanges();
                expect(element.querySelectorAll(".starred").length).toBe(3);
            });
        }));
    });
    describe("when the big property is set", () => {
        it("should set use the big icons", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(Rating).then((componentFixture: ComponentFixture) => {
                const element: any = componentFixture.nativeElement;
                componentFixture.componentInstance.big = true;
                componentFixture.detectChanges();
                expect(element.querySelectorAll(".fa-2x").length).toBe(5);
            });
        }));
    });
    describe("when update()", () => {
        it("set the rate with the correct value", <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(Rating).then((componentFixture: ComponentFixture) => {
                spyOn(componentFixture.componentInstance.setRate, "emit");
                let newVal: number = 3;
                componentFixture.componentInstance.update(newVal);
                expect(componentFixture.componentInstance.setRate.emit).toHaveBeenCalledWith(newVal);
            });
        }));
    });
    describe("when over()", () => {
        it("should highlight all the stars below the passed number",
            <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb.createAsync(Rating).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    let newVal: number = 3;
                    componentFixture.componentInstance.over(newVal);
                    componentFixture.detectChanges();
                    expect(element.querySelectorAll(".over").length).toBe(newVal);
                });
            }));
    });
    describe("when out()", () => {
        it("should highlight no stars",
            <any> injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb.createAsync(Rating).then((componentFixture: ComponentFixture) => {
                    const element: any = componentFixture.nativeElement;
                    let newVal: number = 3;
                    componentFixture.componentInstance.over(newVal);
                    componentFixture.componentInstance.out();
                    componentFixture.detectChanges();
                    expect(componentFixture.componentInstance.overValue).toBe(0);
                    expect(element.querySelectorAll(".over").length).toBe(0);
                });
            }));
    });
});