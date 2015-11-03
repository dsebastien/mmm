"use strict";

import { Injectable } from "angular2/angular2";
import * as Firebase from "firebase";

import { Configuration } from "../../commons/configuration";
import * as _ from "lodash";

/**
 * Data access service.
 */
@Injectable()
export class FirebaseDataService {
	private _firebaseRef:Firebase;

	constructor() {
		console.log("FirebaseDataService initialized");
	}

	get firebaseConnection():Firebase {
		if (_.isUndefined(this._firebaseRef)) {
			this.connectToFirebase();
		}
		return this._firebaseRef;
	}

	private connectToFirebase() {
		console.log("Connecting to Firebase");
		this._firebaseRef = new Firebase(Configuration.databaseURL);
		console.log("Connected to Firebase");
	}
}
