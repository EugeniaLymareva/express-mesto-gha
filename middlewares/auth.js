const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  /// достаём авторизационный заголовок
  const { authorization: token } = req.headers;
  console.log('Proverka', req.headers);
  // console.log('Proverka1', authorization);
  /// убеждаемся, что он есть или начинается с Bearer
  if (!token) {
    // console.log('Proverka1', authorization);
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  /// извлекаем токен методом replace чтобы выкинуть из заголовка приставку 'Bearer ',
  /// в константу запишется только JWT
  let payload;

  try {
    /// верифицируем токен методом verify
    payload = jwt.verify(token, JWT_SECRET);
    console.log('Proverka3', payload);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
