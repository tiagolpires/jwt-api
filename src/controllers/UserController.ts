import { Request, Response } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class UserController {
    async index(req: Request, res: Response) {
        const userRepo = getRepository(User)
        
        const users = await userRepo.find()

        res.json(users)
    }

    async store(req: Request, res: Response) {
        const userRepo = getRepository(User)  

        const { name, email, password } = req.body

        const userExists = await userRepo.findOne({ where: { email } })

        if(userExists) res.status(409).json({error: 'user already exists'})

        const user = userRepo.create({ name, email, password })
        const userData = await userRepo.save(user)
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

    async login(req: Request, res: Response) {
        const userRepo = getRepository(User)  

        const { email, password } = req.body
        const user = await userRepo.findOne({ where: {email} })

        if(!user) return res.status(404).json({error: 'email does not exist'})

        const isValidate = bcrypt.compareSync(password, user.password)
        if(!isValidate) return res.status(403).json({error: 'incorrect password'})

        const token = jwt.sign({id: user.id}, 'secret')

        delete user.password

        res.json({...user, token})
    }
}

export default new UserController()