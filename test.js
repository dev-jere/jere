// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACe4051a1236b78cdddba8a35c6d3821f7";
const authToken = "4269de23455b278765f263e2c5f056e5";
const client = require("twilio")(accountSid, authToken);
client.messages
  .create({ body: "Hello from Nakore", from: "+15673390650", to: "+233554356646" })
  .then(message => console.log(message.sid));