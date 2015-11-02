"use strict";

// Angular 2
import { Component } from "angular2/angular2";

// Authentication
import {FirebaseAuthenticationService} from "../../core/security/authentication/firebaseAuthenticationService";

@Component({
	selector: "nav-bar",
	templateUrl: "components/nav-bar/nav-bar.template.html"
})
export class NavBar {
	private _authenticationService: FirebaseAuthenticationService;
	
	constructor(authenticationService:FirebaseAuthenticationService) {
		console.log("Navbar component loaded");
		this._authenticationService = authenticationService;
	}
	
	get authenticationService(): FirebaseAuthenticationService{
		return this._authenticationService;
	}
}
