const {SHA256} = require('crypto-js');

const message = 'I am user number 3';
const hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

const data = {
  id: 4
}

// Hash data
const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// Change Data
token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()

// Check if data has not been changed
const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
