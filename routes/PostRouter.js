const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPosts)

router.route('/post/:id')
    .put(auth, postCtrl.updatePost)


module.exports = router