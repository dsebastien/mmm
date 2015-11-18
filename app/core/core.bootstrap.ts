"use strict";

// import Angular2 deps
import "zone.js";
import "reflect-metadata";

// import Angular 2
import {Component, CORE_DIRECTIVES, bind, bootstrap} from "angular2/angular2";
import {Http, HTTP_PROVIDERS} from "angular2/http";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router, LocationStrategy, PathLocationStrategy, ROUTER_PROVIDERS} from "angular2/router";
// todo add HTML5LocationStrategy (whatever the new name) & remove path location strategy

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
	templateUrl: "core/core.bootstrap.template.html", //template: "<router-outlet></router-outlet>",
	directives: [CORE_DIRECTIVES, RouterOutlet, RouterLink, NavBar, UserBar]
})
@RouteConfig([
	{path: "/", component: Home, as: "Home", data: undefined} // the as serves as alias for links, etc
	//new Route({path: "/Home", component: Home, as: "Home", data: undefined}) // the as serves as alias for links, etc
])
class MyMediaManager {
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

// bootstrap our app
console.log("Bootstrapping the App");

// in [] is the list of injector bindings. Those bindings are used when an injector is created. Passing these here make the bindings available application-wide
bootstrap(MyMediaManager, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	bind(LocationStrategy).toClass(PathLocationStrategy), // enables the following: /#/<component_name> rather than /<component_name>
	FirebaseDataService,
	FirebaseAuthenticationService

	//todo replace with
	//bind(LocationStrategy).toClass(HTML5LocationStrategy) // enable HTML5 history API location strategy

]).then(
	success => console.log("Bootstrap successful"),
	error => console.error(error)
);
