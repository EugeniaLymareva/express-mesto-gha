const Card = require('../models/card')

const ERROR_BAD_REQUEST = 400
const ERROR_NOT_FOUND = 404
const ERROR_INTERNAL_SERVER = 500

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(_err => res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id
  Card.create({ name, link, owner })
    .then(card => res.status(200).send(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports.deleteCard = (req, res) => {
  console.log(req.params.cardId)
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then(card => res.status(200).send(card))
    .catch(err => {
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .orFail(new Error('NotValidId'))
    .then(card => res.status(200).send(card))
    .catch(err => {
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' })
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .orFail(new Error('NotValidId'))
    .then(card => res.status(200).send(card))
    .catch(err => {
      if (err.message === 'NotValidId') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' })
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка' })
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' })
    })
}