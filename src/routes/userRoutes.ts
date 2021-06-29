import { Router } from 'express'
import UserController from '../controllers/UserController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.get('/', authMiddleware, UserController.index)
router.post('/', UserController.store)
router.post('/login', UserController.login)
router.delete('/:id', authMiddleware, UserController.delete)

export default router