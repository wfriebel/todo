const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then(doc => {
      res.send(doc);
    }, err => {
      res.status(400).send(err);
    })
})

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({todos});
    }, err => {
      res.status(400).send(err);
    })
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Invalid id");
  }
  Todo.findById(id)
    .then(todo => {
      if (todo) {
        res.send({todo});
      } else {
        res.status(404).send("Valid id, but not in database");
      }
    }, e => {
      res.status(400).send("Could not retrieve from database");
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
