const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const database = process.env.MONGODB_URI;
mongoose.connect(database);

module.exports = {mongoose};
