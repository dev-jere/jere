// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACe4051a1236b78cdddba8a35c6d3821f7";
const authToken = "4269de23455b278765f263e2c5f056e5";
const client = require("twilio")(accountSid, authToken);
client.messages
  .create({ body: "Hello from Nakore", from: "+15673390650", to: "+233554356646" })
  .then(message => console.log(message.sid));

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var rString = randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

console.log(rString);