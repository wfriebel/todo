require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');
const hbs = require('hbs');
const path = require('path');
const methodOverride = require('method-override')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/todos/new', (req, res) => {
  res.render('./todos/new');
})

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save()
    .then(doc => {
      res.send(doc);
    }, err => {
      res.status(400).send(err);
    })
})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  })
    .then(todos => {
      res.send({todos});
    }, err => {
      res.status(400).send(err);
    })
})

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Invalid id");
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
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

app.get('/todos/:id/edit', authenticate, (req, res) => {
  const id = req.params.id;
  res.render('./todos/edit', {id})
})

app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Invalid id");
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      res.send({todo});
    })
    .catch(e => {
      res.status(404).send("Valid id, but not in collection");
    })
})

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  // From lodash
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Invalid id");
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); // Returns a javascript timestamp
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true})
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      } else {
        res.send({todo});
      }
    })
    .catch(e => {
      res.status(404).send();
    })
})

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => {
          res.header('x-auth', token).send(user);
        })
    })
    .catch(e => {
      res.status(400).send();
    })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.send();
    })
    .catch(e => {
      res.status(400).send();
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = {app};
