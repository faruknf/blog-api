const path = require('path');
const dotenv = require('dotenv');

function environment() {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

module.exports = environment;
