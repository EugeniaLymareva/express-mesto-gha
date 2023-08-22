const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { token } = req.cookies;
  /// убеждаемся, что он есть или начинается с Bearer
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
    // return res.status(401).send({ message: 'Необходима авторизация' });
  }
  /// извлекаем токен методом replace чтобы выкинуть из заголовка приставку 'Bearer ',
  /// в константу запишется только JWT
  let payload;

  try {
    /// верифицируем токен методом verify
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
    // return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
