const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = {Todo};

// Mongoose will typcast your values to the type specified
// in the schema. If this is not possible, it will error.
