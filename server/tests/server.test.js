const {expect} = require('chai');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server.js');
const {Todo} = require('../models/todo.js')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect(res => {
      // Test the HTTP response
      expect(res.body.text).to.be.a('string')
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      // Test to see if the document was written into the database
      Todo.find()
        .then(todos => {
          expect(todos.length).to.equal(3);
          expect(todos[2].text).to.equal(text)
          done();
        })
        .catch(e => {
          done(e);
        });
    });
  });

  it('should not create a todo with an invalid text property', done => {
    request(app)
      .post('/todos')
      .send({
        text: ''
      })
      .expect(400)
      .end((err, res)=> {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).to.equal(2);
            done();
          })
          .catch(e => {
            done(e);
          })
      });
  })
})

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).to.equal(2)
      })
      .end(done);
  })
})

describe('GET /todos/:id', () => {
  it('should return a todo', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).to.eq(todos[0]._id.toHexString());
      })
      .end(done);
  })

  it('should return 404 if todo not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  })

  it('should return 404 for an invalid objectID', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  })
})

describe('DELETE /todo/:id', () => {
  it('should remove a todo', done => {
    const hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).to.equal('First test todo');
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.findById()
          .then(res => {
            expect(res).to.be.null;
            done();
          })
          .catch(e => {
            done(e);
          })
      })
  })

  it('should return 404 if todo not found', done => {
    // const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  })

  it('should return 404 if objectID is invalid', done => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe('GET /users/me', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).to.equal(users[0]._id.toHexString());
      })
      .end(done);
  })
  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).to.eql({});
      })
      .end(done);
  })
})
