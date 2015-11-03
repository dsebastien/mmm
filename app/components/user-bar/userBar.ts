"use strict";

// Angular 2
import { Component, Input, Output, EventEmitter } from "angular2/angular2";

import {UserInfo} from "../../core/security/authentication/userInfo";

@Component({
	selector: "user-bar",
	templateUrl: "components/user-bar/user-bar.template.html"
})
export class UserBar {
	@Input() userInfo:UserInfo;
	@Input() userIsAuthenticated:boolean;
	@Output() logonWithGoogleEvent:EventEmitter = new EventEmitter();
	@Output() logoutEvent:EventEmitter = new EventEmitter();

	constructor() {
		console.log("UserBar component loaded");
	}

	/**
	 * Generate a logon with Google event.
	 */
	logonWithGoogle() {
		console.log("Event: logon with Google");
		this.logonWithGoogleEvent.next(null);
	}

	/**
	 * Generate a logout event.
	 */
	logout(){
		console.log("Event: logout");
		this.logoutEvent.next(null);
	}
}
