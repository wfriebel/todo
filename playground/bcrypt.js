const bcrypt = require('bcryptjs');

const password = '123abc!';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (e, hash) => {
    console.log(hash);
  })
})

const hashedPassword = '$2a$10$/DF89lpN5oDVNAtA5MvBDeD3VTC.i9JIfeGRAyQkgDzO.ZQbJxgbi';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
})
