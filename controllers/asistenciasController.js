const User = require('../models/User')
const Asistencia = require('../models/Asistencia')

isAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user.status === 'Activo') {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

exports.getTodasAsistencias = (req, res) => {
  const { user } = req
  Asistencia.find({ status: 'Confirmación pendiente' })
    .populate('solicitante')
    .then(asistencias => {
      res.render('asistencias-all', { user, asistencias, isFixer: 'isFixer' })
    })
}

exports.postAsignarFixer = (req, res) => {
  let { _id: fixer } = req.user
  let { id } = req.body
  Asistencia.findByIdAndUpdate(id, { status: 'Activo', fixer: fixer }).then(() => res.redirect('/profile'))
}

exports.getVerAsistencia = (req, res) => {
  const { user } = req
  res.render('new-asistencia', { user, isUser: 'isUser' })
}

exports.postCrearAsistencia = (req, res) => {
  let images = req.files.map(file => file.url)
  let { _id: solicitante } = req.user
  let { lat, lng, address, ...asistencia } = req.body
  let location = { address, coordinates: [lat, lng] }
  asistencia = { ...asistencia, images, solicitante, location }
  Asistencia.create(asistencia)
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => {
      res.render('new-asistencia', { err })
    })
}

exports.getAsignarSolicitante = (req, res) => {
  const { id } = req.params
  const { user } = req
  Asistencia.findById(id)
    .populate('solicitante')
    .then(asistencia => {
      res.render('route', {
        user,
        asistencia,
        isFixer: 'isFixer'
      })
    })
}
