const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const database = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(database);

module.exports = {mongoose};
