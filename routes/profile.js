const express = require('express')
const router = express.Router()
const uploader = require('../helpers/multer')

const { home, getEditProfile, postEditProfile } = require('../controllers/profileController')

router.get('/', isAuth, home)
router.get('/:id/edit', isAuth, getEditProfile)
router.post('/:id/edit', isAuth, uploader.single('image'), postEditProfile)

module.exports = router
