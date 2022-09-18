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
        var _a, _b, _c;
        if (!resp) {
            throw new Error("No result found!");
        }
        const payload = JSON.parse(resp);
        const result = payload
            ? (_c = (_b = (_a = payload[0]) === null || _a === void 0 ? void 0 : _a.meanings[0]) === null || _b === void 0 ? void 0 : _b.definitions[0]) === null || _c === void 0 ? void 0 : _c.definition
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
