import express from 'express'
import {registrarUsuario, logarUsuario, excluirUsuario, atualizarUsuario} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', registrarUsuario)

router.post('/login', logarUsuario)

router.delete('/:id', excluirUsuario)

router.put('/:id', atualizarUsuario)

export default router