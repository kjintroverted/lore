import { createSolidDataset, getPodUrlAllFrom, getSolidDataset, getStringNoLocale, getThing, getUrl, saveSolidDatasetAt } from "@inrupt/solid-client";
import { login } from "@inrupt/solid-client-authn-browser";

export function loginToPod() {
    return login({
        oidcIssuer: "https://login.inrupt.com",
        redirectUrl: new URL("/", window.location.href).toString(),
        clientName: "Lore"
    });
}

export async function getProfile(session) {
    let profile;
    try {
        let userData = await getSolidDataset(
            session.info.webId,
            { fetch: session.fetch }
        )
        let podRoot = getPodUrlAllFrom({ webIdProfile: userData, altProfileAll: [] }, session.info.webId)
        profile = {
            username: session.info.webId.split("/").at(-1),
            storageURL: podRoot[0]
        }
    } catch (e) {
        debugger
    }
    return profile;
}

export async function getDataSet(session, url) {
    let movieSolidDataset;
    try {
        // Get the SolidDataset for Writing 101 at the specified URL
        movieSolidDataset = await getSolidDataset(
            url,
            { fetch: session.fetch }
        );
    } catch (e) {
        if (e.response.status === 404) { // Dataset doesn't exist
            // create movie DataSet
            console.info(`No movie data found. Creating a new data set at ${url}`)
            movieSolidDataset = createSolidDataset();
            movieSolidDataset = await saveSolidDatasetAt(
                url,
                movieSolidDataset,
                { fetch: session.fetch }
            );
        }
    }
    return movieSolidDataset;
}

export async function saveThing(dataset, data, shape) {
    console.log("Saving:", data);
}