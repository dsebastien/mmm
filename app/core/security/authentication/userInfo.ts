/**
 * Basic user information
 */
export interface UserInfo {
    uid: string;
    name: string;
    email: string;
    picture: string;
}

export class UserInfoImpl implements UserInfo {
    private _uid:string = "";
    private _name:string = "";
    private _email:string = "";
    private _picture:string = "";

    get uid() {
        return this._uid;
    }

    get name():string {
        return this._name;
    }

    get email():string {
        return this._email;
    }

    get picture():string {
        return this._picture;
    }

    set uid(value:string) {
        this._uid = value;
    }

    set name(value:string) {
        this._name = value;
    }

    set email(value:string) {
        this._email = value;
    }

    set picture(value:string) {
        this._picture = value;
    }
}
