const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const {
  validationUserId,
  validationUpdateUser,
  validationUpdateUserAvatar,
} = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:userId', validationUserId, getUserId);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateUserAvatar, updateUserAvatar);

module.exports = router;
