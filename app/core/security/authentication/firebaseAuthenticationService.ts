"use strict";

import { Injectable } from "angular2/angular2";
import * as Firebase from "firebase";
import { FirebaseDataService } from "../../services/data/firebaseDataService";
import {FirebaseAuthenticationProviders} from "./firebaseAuthenticationProviders";
import { UserInfo, UserInfoImpl } from "./userInfo";

/**
 * Manages the authentication process.
 */
@Injectable()
export class FirebaseAuthenticationService {
	private _dataService:FirebaseDataService;
	private _authData:FirebaseAuthData;
	private _userIsAuthenticated:boolean = false;
	private _userInfo:UserInfo = new UserInfoImpl();

	constructor(dataService:FirebaseDataService) {
		console.log("FirebaseAuthenticationService initialized");
		this._dataService = dataService;
		this._dataService.firebaseConnection.onAuth((authData) => {
			console.log("Authentication event received");
			if (authData) {
				this._authData = authData;
				this._userIsAuthenticated = true;
				console.log("User authenticated");
				if (authData.provider === FirebaseAuthenticationProviders.google) {
					this._userInfo.uid = authData.google.id;
					this._userInfo.name = authData.google.displayName;
					this._userInfo.email = authData.google.email;
					this._userInfo.picture = authData.google.profileImageURL;
					//console.log(authData);
				}
			} else {
				console.log("User is logged out");
				this._userIsAuthenticated = false;
				this._authData = undefined;
				this._userInfo = new UserInfoImpl();
			}
		});
	}

	/**
	 * Handler that is invoked right after authentication (successful or not)
	 * @param error
	 * @param authData
	 */
	authenticationHandler(error, authData) {
		if (error) {
			console.log("Authentication failed or user didn't give consent!", error); // todo improve error handling
		}
		// we only handle the error case here as there is a global auth handler above 
	}

	authenticateWithGoogle():void {
		console.log("Logging in with Google");
		const firebaseConnection:Firebase = this._dataService.firebaseConnection;
		//todo make sure that the connection is defined!

		firebaseConnection.authWithOAuthPopup("google", this.authenticationHandler, {
			scope: "email" // request the user's e-mail in addition to basic informations
		});
	}

	/**
	 * Logon with the given provider
	 * @param provider provider name
	 */
	logonWith(provider:string) { //todo create enum with supported providers
		console.log("Logging user in...");

		if (provider === FirebaseAuthenticationProviders.google) {
			this.authenticateWithGoogle();
		} else {
			console.error("The requested logon provider is not supported", provider);
		}
	}

	/**
	 * Logout
	 */
	logout() {
		if (this._userIsAuthenticated) {
			console.log("Logging the user out");
			const firebaseConnection:Firebase = this._dataService.firebaseConnection;
			firebaseConnection.unauth();
		}
	}

	get userInfo():UserInfo {
		return this._userInfo;
	}

	get userIsAuthenticated():boolean {
		return this._userIsAuthenticated;
	}
}
