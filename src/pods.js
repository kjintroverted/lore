// Import from "@inrupt/solid-client-authn-browser"
import {
    login
} from "@inrupt/solid-client-authn-browser";

// 1a. Start Login Process. Call login() function.
export function loginToPod() {
    return login({
        oidcIssuer: "https://login.inrupt.com",
        redirectUrl: new URL("/", window.location.href).toString(),
        clientName: "Lore"
    });
}
