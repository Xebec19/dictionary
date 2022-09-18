"use strict";
const { rejects } = require("assert");
const { makeCall } = require("./search");
const { resolve } = require("path");
const args = process.argv;
try {
    if (args.length < 2) {
        throw new Error("No search keyword found!");
    }
    const searchString = args[2];
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchString}`;
    if (!searchString.match(/^[a-z\d\-_\s\%\(\)\&]+$/i)) {
        throw new Error("Speacial characters are not allowed!");
    }
    makeCall(url)
        .then((resp) => {
        if (!resp) {
            throw new Error("No result found!");
        }
        const payload = JSON.parse(resp);
        const result = payload
            ? payload[0]?.meanings[0]?.definitions[0]?.definition
            : null;
        console.log(result);
    })
        .catch((err) => {
        console.error(err);
    });
}
catch (error) {
    console.error(error.message);
}
