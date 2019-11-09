/* eslint-disable */
// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

function createPage(value) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body>
    <h1>${value.sgv}</h1>
    </body>
    </html>
  `;
  return html;
}

const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    const response = await fetch(process.env.ENTRIES_URL);
    if (response.status != 200) {
      return { statusCode: response.status, body: { error: statusText } };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: createPage(data[0])
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
