import { Request, Response } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'
import { User } from '../models/User'

class UserController {
    async index(req: Request, res: Response) {
        const userRepo = getRepository(User)
        
        const users = await userRepo.find()

        res.json(users)
    }

    async store(req: Request, res: Response) {
        const userRepo = getRepository(User)  

        const { name, seatId } = req.body

        const userExists = await userRepo.findOne({ where: { name } })

        if(userExists) res.status(409).json({error: 'user already exists'})

        const user = userRepo.create({ name })
        const userData = await userRepo.save(User)
        res.json(userData)
    }

    async delete(req: Request, res: Response) {
        const userRepo = getRepository(User)  

        const { id } = req.params

        const user = await userRepo.findOne({ where: {id} })

        if(!user) return res.status(404).json({error: 'user does not exist'})

        await userRepo.remove(user)

        res.json({sucess: true})
    }
}

export default new UserController()