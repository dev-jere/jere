// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACe4051a1236b78cdddba8a35c6d3821f7";
const authToken = "0cd00aea2505dcabc44979fbb3da4694";
const client = require("twilio")(accountSid, authToken);
client.messages
  .create({ body: "Hello from Nakore", from: "+15673390650", to: "+233554356646" })
  .then(message => console.log(message.sid));