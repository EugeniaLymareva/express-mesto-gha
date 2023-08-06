const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})

const app = express()

app.use((req, res, next) => {
  req.user = {
    _id: '64ccffe74ecf9860850930d8' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', require('./routes/users'))
app.use('/cards', require('./routes/cards'))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})


