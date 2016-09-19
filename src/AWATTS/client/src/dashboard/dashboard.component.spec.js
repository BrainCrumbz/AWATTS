"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var router_1 = require('@angular/router-deprecated/src/router');
var testing_2 = require('@angular/common/testing');
var dashboard_component_1 = require('./dashboard.component');
var hero_service_1 = require('../heroes/hero.service');
testing_1.describe('DashboardComponent', function () {
    var heroService;
    function mockServiceFactory() {
        heroService = jasmine.createSpyObj('HeroService', [
            'getHeroes', 'getHeroesSlowly', 'getHero']);
        return heroService;
    }
    testing_1.beforeEachProviders(function () { return [
        dashboard_component_1.DashboardComponent,
        core_1.provide(hero_service_1.HeroService, { useFactory: mockServiceFactory }),
        router_deprecated_1.RouteRegistry,
        core_1.provide(common_1.Location, { useClass: testing_2.SpyLocation }),
        core_1.provide(router_deprecated_1.ROUTER_PRIMARY_COMPONENT, { useValue: dashboard_component_1.DashboardComponent }),
        core_1.provide(router_deprecated_1.Router, { useClass: router_1.RootRouter })
    ]; });
    testing_1.it('true is true', function () { return testing_1.expect(true).toBe(true); });
    testing_1.it('should have empty heroes', testing_1.inject([dashboard_component_1.DashboardComponent], function (dashboard) {
        testing_1.expect(dashboard.heroes).toEqual([]);
    }));
});
//# sourceMappingURL=dashboard.component.spec.js.map