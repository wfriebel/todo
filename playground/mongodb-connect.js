// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

// const obj = ObjectID();
// console.log(obj);

const url = 'mongodb://localhost:27017/TodoApp';
const dbName = 'TodoApp';
MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');

  const db = client.db(dbName);

  // Insert Data
  // db.collection('Todos').insertOne({
  //   text: 'Eat Lunch',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // })


  // Find a document
  // db.collection('Todos').find().toArray().then(result => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(result, undefined, 2));
  // }, err => {
  //   console.log('Unable to fetch Todos', err);
  // })


  // Find documents with a filter
  // db.collection('Todos').find({completed: false}).toArray()
  //   .then(result => {
  //    console.log(JSON.stringify(result, undefined, 2));
  // })


  // Find documents by object ID
  // db.collection('Todos').find({
  //   _id: new ObjectId('5a9c641d3a77f9ea5a58c581')}).toArray()
  //   .then(result => {
  //    console.log(JSON.stringify(result, undefined, 2));
  // })


  // Using count
  // db.collection('Todos').find({}).count()
  //   .then(count => {
  //     console.log('Todos count:', count);
  // })


  // Deleting documents
    // deleteOne
    // db.collection('Todos').deleteOne({
    //   text: 'Eat Lunch'
    // })
    //   .then(result => {
    //     console.log(result, undefined, 2);
    //   })

    // deleteMany
    //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   _id: new ObjectID('5a9c742b0cfc105b753bb3ac')
  // }, result => {
  //   console.log('Deleted document:');
  //   console.log(JSON.stringify(result, undefined, 2));
  // })

  //Updating documents
    // updateOne
    // updateMany
    // findOneandUpdate
  // db.collection('Todos').findOneAndUpdate(
  //   {
  //     _id: ObjectId("5a99f817728cfbd6f7901334")
  //   },
  //   {
  //     $set: {havingFun: true}
  //   },
  //   {
  //     returnOriginal: false
  //   })
  //   .then(result => {
  //     console.log(result, undefined, 2);
  //   })

  // Close the connection to the database
  client.close();
})

//Windows set-up
  // Where windows installs mongodb
    // C:\Program Files\MongoDB\Server\3.2\
  // Then make a file in your user directory called mongo-data

// Start up your database
  // When in C:\Program Files\MongoDB\Server\3.2\bin, run
  // mongod.exe --dbpath /Users/palycs/mongo-data

// Access your database using the CLI client
  // In C:\Program Files\MongoDB\Server\3.2\ run:
  // mongo.exe
