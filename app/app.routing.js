"use strict";
var router_1 = require('@angular/router');
var archive_component_1 = require('./archive.component');
var home_component_1 = require('./home.component');
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'archive', component: archive_component_1.ArchiveComponent },
];
var NameRoutingModule = (function () {
    function NameRoutingModule() {
    }
    return NameRoutingModule;
}());
exports.NameRoutingModule = NameRoutingModule;
exports.appRouting = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map