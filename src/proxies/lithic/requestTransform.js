const forge = require("node-forge");

const createKey = (LITHIC_PUB_KEY) => {
  const pem = Buffer.from(LITHIC_PUB_KEY, "base64").toString("binary");
  return forge.pki.publicKeyFromPem(pem);
};

function randomInt(low, high) {
  // Generate random integer between low and high, inclusive
  return Math.floor(Math.random() * (high - low + 1) + low);
}

const encryptPinBlock = (pin, publicKey) => {
  const pinBlock = {
    nonce: randomInt(1e8, 1e12),
    pin,
  };

  console.log(pinBlock);

  const ciphertext = publicKey.encrypt(JSON.stringify(pinBlock), "RSA-OAEP", {
    md: forge.md.sha1.create(),
    mgf1: {
      md: forge.md.sha1.create(),
    },
  });

  // Use this for the "pin" field value when creating or updating cards
  const encryptedPinBlock = forge.util.encode64(ciphertext);

  return {
    ...pinBlock,
    pin: encryptedPinBlock,
  };
};

module.exports = (req) => {
  console.log("Request received");
  const {
    args,
    configuration: { LITHIC_PUB_KEY, LITHIC_API_KEY },
  } = req;
  const {
    body: { pin, ...body },
    headers,
  } = args;

  const publicKey = createKey(LITHIC_PUB_KEY);
  const pinBlock = encryptPinBlock(pin, publicKey);

  console.log(pinBlock);

  return {
    body: {
      ...body,
      ...pinBlock,
    },
    headers: {
      ...headers,
      Authorization: LITHIC_API_KEY,
    },
  };
};
