const User = require('../models/User')
const Asistencia = require('../models/Asistencia')

isAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user.status === 'Activo') {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

exports.home = (req, res) => {
  console.log(req.user)
  const { user } = req
  if (user.role === 'User') {
    Asistencia.find({ solicitante: user._id })
      .populate('fixer')
      .then(asistencias => {
        console.log(asistencias)
        res.render('profile', {
          user,
          asistencias,
          isUser: 'isUser'
        })
      })
  } else if (user.role === 'Fixer') {
    Asistencia.find({ fixer: user._id })
      .populate('solicitante')
      .then(asistencias => {
        res.render('profile', { user, asistencias, isFixer: 'isFixer' })
      })
  }
}

exports.getEditProfile = (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then(user => {
      res.render('profile-form', { user })
    })
    .catch(err => {
      res.render('profile-form', { err })
    })
}

exports.postEditProfile = (req, res) => {
  const { id: _id } = req.params
  const { email } = req.user
  const image = req.file ? req.file.url : undefined
  const user = image ? { ...req.body, image } : req.body
  User.findOneAndUpdate({ _id, email }, { $set: user })
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => {
      res.render('profile-form', { err })
    })
}
