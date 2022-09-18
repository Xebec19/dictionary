"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCall = void 0;
const https = require("https");
function makeCall(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (resp) => {
            let data = "";
            // A chunk of data has been received.
            resp.on("data", (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            resp.on("end", () => {
                resolve(data);
            });
        })
            .on("error", (err) => {
            reject(err.message);
        });
    });
}
exports.makeCall = makeCall;
