const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPosts)

router.route('/post/:id')
    .put(auth, postCtrl.updatePost)

router.put('/post/:id/like', auth, postCtrl.likePost)
router.put('/post/:id/unlike', auth, postCtrl.unLikePost)


module.exports = router