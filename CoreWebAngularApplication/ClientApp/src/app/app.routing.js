"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var product_list_component_1 = require("./product/product-list.component");
var product_create_component_1 = require("./product/product-create.component");
var product_edit_component_1 = require("./product/product-edit.component");
var not_found_component_1 = require("./not-found.component");
var product_detail_component_1 = require("./product/product-detail.component");
var home_component_1 = require("./home/home.component");
var counter_component_1 = require("./counter/counter.component");
var fetch_data_component_1 = require("./fetch-data/fetch-data.component");
var login_component_1 = require("./login/login.component");
var auth_guard_1 = require("./helpers/auth.guard");
var register_component_1 = require("./register/register.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full', canActivate: [auth_guard_1.AuthGuard] },
    { path: 'home', component: home_component_1.HomeComponent, pathMatch: 'full', canActivate: [auth_guard_1.AuthGuard] },
    { path: 'product-list', component: product_list_component_1.ProductListComponent, canActivate: [auth_guard_1.AuthGuard] },
    //{ path: 'product-list', component: ProductListComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'create', component: product_create_component_1.ProductCreateComponent },
    { path: 'product-list/edit/:id', component: product_edit_component_1.ProductEditComponent },
    { path: 'product/:id', component: product_detail_component_1.ProductDetailComponent },
    { path: 'counter', component: counter_component_1.CounterComponent },
    { path: 'fetch-data', component: fetch_data_component_1.FetchDataComponent },
    { path: 'not-found', component: not_found_component_1.NotFoundComponent },
    { path: '**', redirectTo: '/' }
];
exports.appRoutingModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map