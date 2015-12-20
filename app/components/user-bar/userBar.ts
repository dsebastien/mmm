"use strict";

// Angular 2
import { Component, Input, Output, EventEmitter } from "angular2/core";

import {UserInfo} from "../../core/security/authentication/userInfo";

@Component({
	selector: "user-bar",
	templateUrl: "components/user-bar/user-bar.template.html"
})
export class UserBar {
	@Input() userInfo:UserInfo;
	@Input() userIsAuthenticated:boolean;
	@Output() logonWithGoogleEvent:EventEmitter<void> = new EventEmitter<void>();
	@Output() logoutEvent:EventEmitter<void> = new EventEmitter<void>();

	constructor() {
		console.log("UserBar component loaded");
	}

	/**
	 * Generate a logon with Google event.
	 */
	logonWithGoogle() {
		console.log("Event: logon with Google");
		this.logonWithGoogleEvent.emit(null);
	}

	/**
	 * Generate a logout event.
	 */
	logout() {
		console.log("Event: logout");
		this.logoutEvent.emit(null);
	}
}
