import { Router } from 'express'
import userRouter from './userRoutes'

const router = Router()

router.use('/students', userRouter)

export default router