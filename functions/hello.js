exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: `Hello, World. ${process.env.ENTRIES_URL}`
  });
};
