"use strict";

// import Angular 2
import { Component, CORE_DIRECTIVES } from "angular2/angular2";

@Component({
	selector: "page-home",
	templateUrl: "pages/home/home.template.html",
	directives: [CORE_DIRECTIVES]
})
export class Home {

	// Firebase configuration
	firebaseUrl:string;
	firebaseRef:Firebase;
	isLoggedIn:boolean = false;
	authData:any;

	constructor() {
		console.log("Home component loaded");

		this.firebaseUrl = "http://myMediaManager.firebaseio.com"; // root
		this.firebaseRef = new Firebase(this.firebaseUrl);
		this.firebaseRef.onAuth((user) => {
			if (user) {
				this.authData = user;
				this.isLoggedIn = true;
			}
		})
	}

	authenticateWithGoogle() {
		this.firebaseRef.authWithOAuthPopup("google", (error) => {
			if (error) {
				console.log(error); // todo improve error handling
			}
		});
	}
}
