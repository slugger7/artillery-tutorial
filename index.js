const express = require('express');
const app = express();

const port = 3000;

app.get('/increment-number', (req, res) => {
  let data;
  
  if (req.query.number) {
    console.log('We got a number', req.query.number);
    data = {
      number: parseInt(req.query.number) + 1
    };
  } else {
    console.log('No number, returning default');
    data = {
      number: 1
    };
  }

  console.log('The data to return is ', data);
  setTimeout(() => res.json(data), 500); // this is to simulate some time consuming task like a db call
});

app.listen(port, () => console.log(`App is running on port ${port}`));
