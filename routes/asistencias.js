const express = require('express')
const router = express.Router()
const uploader = require('../helpers/multer')

const {
  getTodasAsistencias,
  postAsignarFixer,
  getVerAsistencia,
  postCrearAsistencia,
  getAsignarSolicitante
} = require('../controllers/asistenciasController')

router.get('/', isAuth, getTodasAsistencias)
router.post('/', isAuth, postAsignarFixer)
router.get('/new', isAuth, getVerAsistencia)
router.post('/new', isAuth, uploader.array('images'), postCrearAsistencia)
router.get('/:id', isAuth, getAsignarSolicitante)

module.exports = router
