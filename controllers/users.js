const User = require('../models/user')

const ERROR_BAD_REQUEST = 400
const ERROR_NOT_FOUND = 404
const ERROR_INTERNAL_SERVER = 500

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(_err => res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }))
}

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then(user => {
      res.status(200).send(user)
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' })
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные _id пользователя' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true // если пользователь не найден, он будет создан
    }
  )
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' })
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true // если пользователь не найден, он будет создан
    }
  )
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' })
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}



