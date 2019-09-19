const express = require('express')
const router = express.Router()

const {
  getLogin,
  getRegister,
  postLogin,
  postResgister,
  getConfirmation,
  getLogout
} = require('../controllers/authController')

router.get('/login', getLogin)
router.get('/register', getRegister)
router.post('/login', postLogin)
router.post('/register', postResgister)
router.get('/confirm/:confirmCode', getConfirmation)
router.get('/logout', getLogout)

module.exports = router
