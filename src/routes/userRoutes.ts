import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.get('/', UserController.index)
router.post('/', UserController.store)
router.delete('/:id', UserController.delete)

export default router