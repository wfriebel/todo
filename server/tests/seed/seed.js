const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'will@gmail.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET)
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'mark@gmail.com',
    password: 'userTwopass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET)
      }
    ]
  }
]

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    _creator: userTwoId
  }
]

const populateTodos = done => {
  Todo.remove()
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
}

const populateUsers = done => {
  User.remove()
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo])
    })
    .then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers};
