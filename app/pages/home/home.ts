///<reference path="../../typings/typings.d.ts" />
"use strict";

// import Angular 2
import { Component, CORE_DIRECTIVES } from "angular2/angular2";
import { NavBar } from "../../components/nav-bar/navBar";

@Component({
	selector: "page-home",
	templateUrl: "pages/home/home.template.html",
	directives: [CORE_DIRECTIVES, NavBar]
})
export class Home {
	constructor() {
		console.log("Home component loaded");
	}
}
