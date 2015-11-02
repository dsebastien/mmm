"use strict";

import { Injectable } from "angular2/angular2";
import * as Firebase from "firebase";

import { Configuration } from "../../commons/configuration";

/**
 * Data access service.
 */
@Injectable()
export class FirebaseDataService {
	private _firebaseRef:Firebase;

	constructor() {
		console.log("FirebaseDataService initialized");
	}
	
	getFirebaseConnection():Firebase {
		if(this._firebaseRef === undefined){
			console.log("Connecting to Firebase");
			this._firebaseRef = new Firebase(Configuration.databaseURL);
			console.log("Connected to Firebase");
		}
		return this._firebaseRef;
	}
}
