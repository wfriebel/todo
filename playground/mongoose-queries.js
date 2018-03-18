const {mongoose} = require('./../server/db/mongoose.js');
const {ObjectId} = require('mongodb');
const {Todo} = require('./../server/models/todo.js');

const id = '55aac02579b10d1244e0a041f';

if (!ObjectId.isValid(id)) {
  console.log('Id not valid');
}

// Todo.find({
//   _id: id
// })
//   .then(todos => {
//     console.log(todos);
//   }, err => {
//     console.log('could not find todo');
//   })

// find({}), findOne({}), findById(id)
Todo.findById(id).then(todo => {
  if (!todo) {
    return console.log('Todo not found');
  }
  console.log(todo);
})
  .catch(err => {
    console.log(err);
  })
