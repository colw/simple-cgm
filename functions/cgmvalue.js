const https = require("https");

function parseResult(data) {
  return data[0].sgv;
}

exports.handler = function (event, context, callback) {
  https.get(process.env.ENTRIES_URL, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      const value = parseResult(body);
      callback(null, {
        statusCode, 200,
        body: value
      })
    });
  });
}