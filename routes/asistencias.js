const express = require('express')
const router = express.Router()
const uploader = require('../helpers/multer')
const User = require('../models/User')
const Asistencia = require('../models/Asistencia')

isAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user.status === 'Activo') {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

router.get('/', isAuth, (req, res) => {
  const { user } = req
  Asistencia.find({ status: 'Pending Confirmation' })
    .populate('solicitante')
    .then(asistencias => {
      res.render('asistencias-all', { user, asistencias })
    })
})

router.post('/', isAuth, (req, res) => {
  let { _id: fixer } = req.user
  let { id } = req.body
  Asistencia.findByIdAndUpdate(id, { status: 'Active', fixer: fixer }).then(() => res.redirect('/profile'))
})

router.get('/new', isAuth, (req, res) => {
  const { user } = req
  res.render('new-asistencia', { user })
})

router.post('/new', isAuth, uploader.array('images'), (req, res) => {
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
})

router.get('/:id' , isAuth, (req,res) => {
  const { id } = req.params
  const {user} = req
  Asistencia.findById(id).populate('solicitante').then (asistencia => {
    res.render('route', {user, asistencia})
  })
})

module.exports = router
