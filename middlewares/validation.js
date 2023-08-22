const { celebrate, Joi } = require('celebrate');

const pattern = '^https?://(www\\.)?[a-zA-Z0-9-_.~:/?#[\\]@!$&\'()*+,;=%]+#?$';
const regex = new RegExp(pattern, 'i');

const validationSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validationUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regex),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationSignUp,
  validationSignIn,
  validationUserId,
  validationUpdateUser,
  validationUpdateUserAvatar,
  validationCreateCard,
  validationCardId,
};
