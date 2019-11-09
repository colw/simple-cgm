/* eslint-disable */
// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

function getArrowChar(direction) {
  let arrow;
  switch (direction) {
    case "TripleUp":
      arrow = "⤊";
      break;
    case "DoubleUp":
      arrow = "⇈";
      break;
    case "SingleUp":
      arrow = "↑";
      break;
    case "FortyFiveUp":
      arrow = "↗";
      break;
    case "Flat":
      arrow = "→";
      break;
    case "FortyFiveDown":
      arrow = "↘";
      break;
    case "SingleDown":
      arrow = "↓";
      break;
    case "DoubleDown":
      arrow = "⇊";
      break;
    case "TripleDown":
      arrow = "⤋";
      break;
    case "NOT COMPUTABLE":
      arrow = "-";
      break;
    case "RATE OUT OF RANGE":
      arrow = "⇕";
      break;
    default:
      arrow = "~";
  }
  return arrow;
}

function createPage(value) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body>
    <h1>${value.sgv} ${getArrowChar(value.direction)}</h1>
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
