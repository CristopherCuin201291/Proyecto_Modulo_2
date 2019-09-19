const User = require('../models/User')
const passport = require('passport')
const nodemailer = require('nodemailer')

exports.getLogin = (req, res) => {
  res.render('auth-form', { action: 'Iniciar Sesión' })
}

exports.getRegister = (req, res) => {
  res.render('auth-form')
}

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.render('auth-form', { err })
    }
    if (!user) {
      return res.render('auth-form', { err })
    }
    req.logIn(user, err => {
      if (err) {
        return res.render('auth-form', { err })
      }
      if (user.status === 'Pending Confirmation') {
        return res.render('auth-form', {
          pendingConfirm: 'Por favor verifica tu email',
          action: 'Iniciar Sesión'
        })
      }
      return res.redirect('/profile')
    })
  })(req, res, next)
}

exports.postResgister = (req, res) => {
  const { password } = req.body
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let token = ''
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)]
  }
  const confirmationCode = token

  const user = { ...req.body, confirmationCode }

  User.register(user, password)
    .then(data => {
      transporter.sendMail({
        from: 'Carfix <noreply@carfix.com>',
        to: data.email,
        subject: 'Confirma Tu Cuenta de Carfix',

        text: `Hola ${data.name} 
          Por favor da click en el enlace aquí abajo para confirmar tu cuenta ${data.role} de Carfix: 
          ${req.headers.origin}/auth/confirm/${data.confirmationCode}
          Bienvenido a Carfix.`
      })
      let userName = user.name
      res.render('email-sent', { userName })
    })
    .catch(err => {
      res.render('auth-form', { err })
    })
}

exports.getConfirmation = (req, res) => {
  User.find({ confirmationCode: req.params.confirmCode }).then(user => {
    let id = user[0]._id

    User.findByIdAndUpdate(id, { status: 'Activo' }, () => {
      let userEmail = user[0].email
      let userId = user[0]._id
      let userName = user[0].name
      res.render('confirm', { userEmail, userId, userName })
    })
  })
}

exports.getLogout = (req, res) => {
  req.logout()
  res.redirect('/')
}
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})
