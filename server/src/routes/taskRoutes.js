import express from 'express'
import { registrarTask, excluirTask, listarTask, atualizarTask } from '../controllers/taskController.js'

const router = express.Router()

router.get('/', listarTask)

router.delete('/:id', excluirTask)

router.post('/', registrarTask)

router.put('/:id', atualizarTask)

export default router