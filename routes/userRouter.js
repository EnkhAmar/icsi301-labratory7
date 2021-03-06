const router = require('express').Router()
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/userCtrl')


router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.put('/user', auth, userCtrl.updateUser)

router.put('/user/:id/follow', auth , userCtrl.follow)
router.put('/user/:id/unfollow', auth , userCtrl.unfollow)


module.exports = router