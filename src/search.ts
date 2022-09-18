const https = require("https");
export function makeCall(url: string) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp: any) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk: any) => {
          data += chunk;
        });

        // The whole response has been received.
        resp.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err: any) => {
        reject(err.message);
      });
  });
}
