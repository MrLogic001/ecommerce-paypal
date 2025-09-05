const paypal = require('@paypal/checkout-server-sdk');

// Use your sandbox client ID and client secret from your PayPal Developer Dashboard
const CLIENT_ID = "AdOxGf5IPeLyy53NBxMBNgTpx_v44hEIw_iuMBXbK-3RO0Z7u7fgIu_FSClzRE5V0gY5cr7rqnP0z8BZ"; 
const CLIENT_SECRET = "EDyNsFvYd-cyjX1qxwq31g42kyAQ3ynVB-M1f-ZWNn89QU3wweq8j3JQYNT_yX1igSc67JoCSN70x95E";

function environment() {
    return new paypal.core.SandboxEnvironment(CLIENT_ID, CLIENT_SECRET);
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = {
    client: client
};

// Deprecated
/* const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AdOxGf5IPeLyy53NBxMBNgTpx_v44hEIw_iuMBXbK-3RO0Z7u7fgIu_FSClzRE5V0gY5cr7rqnP0z8BZ",
  client_secret: "EDyNsFvYd-cyjX1qxwq31g42kyAQ3ynVB-M1f-ZWNn89QU3wweq8j3JQYNT_yX1igSc67JoCSN70x95E",
});

module.exports = paypal;
 */