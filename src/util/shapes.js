import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import { getAndParse, stringifyAndSet } from "./pods";

export const movieShape = {
    id: {
        predicate: FOAF.openid,
        parse: getStringNoLocale,
        set: setStringNoLocale
    },
    rating: {
        predicate: VCARD.value,
        parse: getAndParse,
        set: stringifyAndSet
    },
    tags: {
        predicate: VCARD.Other,
        parse: getAndParse,
        set: stringifyAndSet
    }
}