const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { validationSignUp, validationSignIn } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use(errorHandler);
// app.use((err, req, res, next) => {
//   // если у ошибки нет статуса, выставляем 500
//   const { statusCode = 500, message } = err;

//   res
//     .status(statusCode)
//     .send({
//       // проверяем статус и выставляем сообщение в зависимости от него
//       message: statusCode === 500
//         ? 'На сервере произошла ошибка'
//         : message,
//     });
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
