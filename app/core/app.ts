"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {Http} from "angular2/http";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

// app components
import {NavBar} from "../components/nav-bar/navBar";
import {UserBar} from "../components/user-bar/userBar";
import {Home} from "../pages/home/home";

// app services
import {FirebaseDataService} from "./services/data/firebaseDataService";
import {FirebaseAuthenticationService} from "./security/authentication/firebaseAuthenticationService";
import {FirebaseAuthenticationProviders} from "./security/authentication/firebaseAuthenticationProviders";


@Component({
    selector: "my-media-manager",
    templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
    directives: [RouterOutlet, RouterLink, NavBar, UserBar]
})
@RouteConfig([
    {path: "/", component: Home, as: "Home", data: undefined} // the as serves as alias for links, etc
    //new Route({path: "/Home", component: Home, as: "Home", data: undefined}) // the as serves as alias for links, etc
])
export class MyMediaManager {
    private _authenticationService:FirebaseAuthenticationService;

    constructor(authenticationService:FirebaseAuthenticationService) {
        console.log("MyMediaManager loaded");
        this._authenticationService = authenticationService;
    }

    get authenticationService():FirebaseAuthenticationService {
        return this._authenticationService;
    }

    logonWithGoogle() {
        console.log("Handling logon with Google event");
        this._authenticationService.logonWith(FirebaseAuthenticationProviders.google);
    }

    logout() {
        console.log("Handling logout event");
        this._authenticationService.logout();
    }
}
