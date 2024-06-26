import { createSolidDataset, createThing, getPodUrlAllFrom, getSolidDataset, getStringNoLocale, getThing, getThingAll, getUrl, saveSolidDatasetAt, setStringNoLocale, setThing } from "@inrupt/solid-client";
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
        console.error(e);
    }
    return profile;
}

export async function getDataSet(fetch, url) {
    let dataset;
    try {
        // Get the SolidDataset for Writing 101 at the specified URL
        dataset = await getSolidDataset(
            url,
            { fetch }
        );
    } catch (e) {
        debugger
        if (e.response && e.response.status === 404) { // Dataset doesn't exist
            // create movie DataSet
            console.info(`No movie data found. Creating a new data set at ${url}`)
            dataset = createSolidDataset();
            dataset = await saveSolidDatasetAt(
                url,
                dataset,
                { fetch: session.fetch }
            );
        }
    }
    return dataset;
}

export function loadFromDataset(dataset, url, struct) {
    const thing = getThing(dataset, url)
    if (!thing) {
        console.error(`Cannot find ${url} in dataset.`, dataset);
        return { thing }
    }
    let datum = {};
    for (let field in struct) {
        let attribute = struct[field]
        datum[field] = attribute.parse(thing, attribute.predicate)
    }
    return { ...datum, thing, struct };
}

// opt needed: id, dataset, fetch
export async function initThing(data, shape, options) {
    let thing = createThing({ id: options.id })
    thing = setAllAttr(thing, { ...data, shape });
    let { dataset: updatedDataset, thing: updatedThing } = await saveThing(thing, options.dataset, options);
    return { dataset: updatedDataset, thing: updatedThing };
}

export function setAllAttr(thing, data) {
    const { shape } = data;
    for (let attr in data) {
        if (!shape[attr]) {
            console.info(`Skipping assignment. No shape attribute found for ${attr}.`);
            continue;
        }
        thing = shape[attr].set(
            thing,
            shape[attr].predicate,
            data[attr]);
    }
    return thing;
}

// opts needed: fetch
export async function saveThing(thing, dataset, options = {}) {
    let updatedDataset = setThing(dataset, thing);
    updatedDataset = await saveSolidDatasetAt(
        updatedDataset.internal_resourceInfo.sourceIri,
        updatedDataset,
        { fetch: options.fetch }
    )
    return { dataset: updatedDataset, thing };
}

export async function loadDataset(dataset, options) {
    let things = getThingAll(dataset);
    return things.map(t => getObjectFromThing(t, options.shape))
}

export function getObjectFromThing(thing, shape) {
    let datum = {};
    for (let field in shape) {
        let attribute = shape[field]
        datum[field] = attribute.parse(thing, attribute.predicate)
    }
    return { ...datum, thing, shape };
}

export function getAndParse(thing, url) {
    let rawData = getStringNoLocale(thing, url);
    return JSON.parse(rawData);
}

export function stringifyAndSet(thing, url, data) {
    let value = JSON.stringify(data);
    return setStringNoLocale(thing, url, value);
}