"use strict";

import { Injectable } from "angular2/angular2";
import * as Firebase from "firebase";
import { FirebaseDataService } from "../../services/data/firebaseDataService";
import { UserInfo } from "./userInfo";

/**
 * Manages the authentication process.
 */
@Injectable()
export class FirebaseAuthenticationService {
	private _dataService:FirebaseDataService;
	private _authData:FirebaseAuthData;
	private _userIsAuthenticated:boolean = false;
	private _userInfo:UserInfo = {
		uid: "",
		name: "",
		picture: ""
	};

	constructor(dataService:FirebaseDataService) {
		console.log("FirebaseAuthenticationService initialized");
		this._dataService = dataService;
	}

	authenticateWithGoogle():void {
		const firebaseConnection:Firebase = this._dataService.getFirebaseConnection();
		
		//todo make sure that the connection is defined!
		
		firebaseConnection.authWithOAuthPopup("google", (error, authData) => {
			if (error) {
				console.log(error); // todo improve error handling
			} else {
				this._authData = authData;
				this._userIsAuthenticated = true;
				this._userInfo.uid = authData.google.id;
				this._userInfo.name = authData.google.displayName;
				this._userInfo.picture = authData.google.profileImageURL;
			}
		});
	}

	get userInfo():UserInfo {
		return this._userInfo;
	}

	isUserAuthenticated():boolean {
		return this._userIsAuthenticated;
	}

	displayStatus():void {
		console.log("Auth data: ", this._authData);
		console.log("User authenticated? ", this._userIsAuthenticated);
	}
}
