const getEvenNum = num => {
  return new Promise((resolve, reject) => {
    if (num % 2 === 0) {
      resolve('even');
    } else {
      reject('odd')
    }
  })
}

getEvenNum(2)
  .then(response => {
    console.log('resolved:', response);
    return new Promise((resolve, reject) => {
      if (response === 'even') {
        resolve(100);
      } else {
        reject(200);
      }
    })
  })
  .then(response => {
    console.log('response two was:', response);
  })
  .catch(response => {
    console.log('rejected:', response);
  })
