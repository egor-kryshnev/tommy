export interface AccessToken {
    "rest_access": {
        "@id": string,
        "@REL_ATTR": string,
        "@COMMON_NAME": string,
        "link": {
            "@href": string,
            "@rel": string
        },
        "access_key": number,
        "expiration_date": number
    }
}