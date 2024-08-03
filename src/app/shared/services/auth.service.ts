declare var google: any
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

const LOGED_USER = 'loged-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    router = inject(Router);

    constructor() { }

    signOut() {
        google.accounts.id.disableAutoSelect()
        localStorage.removeItem(LOGED_USER)
        this.router.navigate(["/"]);
    }

    getUser() : User | null {
        const localUser = JSON.parse(localStorage.getItem(LOGED_USER)!) as User | null;
        if (localUser) {
            const user = {
                name: localUser.name,
                picture: localUser.picture,
                email: localUser.email
            }
            return user;
        }
        return null;
    }

    isLogged() {
        return localStorage.getItem(LOGED_USER) !== null;
    }

    private decodeToke(token: string) {
        return JSON.parse(atob(token.split(".")[1]));
    }

    login(authData: any) {
        // Decode Token
        const payload = this.decodeToke(authData);

        // Store in Session
        localStorage.setItem(LOGED_USER, JSON.stringify(payload))
    }
}