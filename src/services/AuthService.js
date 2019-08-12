import { UserManager } from "oidc-client";

export class AuthService {

    constructor() {
        this.userManager = new UserManager({
            authority: "https://demo.identityserver.io",
            client_id: "spa",
            redirect_uri: "http://localhost:3000/signin-callback.html",
            post_logout_redirect_uri: "http://localhost:3000",
            response_type: "code",
            scope: "openid profile email api"
        });
    }

    getUser() {
        return this.userManager.getUser();
    }

    login() {
        return this.userManager.signinRedirect();
    }

    logout() {
        return this.userManager.signoutRedirect();
    }
}