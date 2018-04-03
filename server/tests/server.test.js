const {expect} = require('chai');
const request = require('supertest');

const {app} = require('../server.js');
const {Todo} = require('../models/todo.js')

const todos = [
  {
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }
]

beforeEach(done => {
  Todo.remove()
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
})

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
  it('Should get all todos', done => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect(res => {
      expect(res.body.todos.length).to.equal(2)
    })
    .end(done);
  })
})
