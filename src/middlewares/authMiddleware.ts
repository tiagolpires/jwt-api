import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayLoad {
    id: number;
    iat: number;
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) return res.status(401).json({error: 'authorization is required'})

    const token = authorization.replace('Bearer', '').trim()

    try {
        const tokenData = jwt.verify(token, 'secret')

        const { id: userId } = tokenData as TokenPayLoad

        req.userId = userId
        return next()
    } catch {
        res.status(401).json({error: 'authorization failed'})
    }

}

export default authMiddleware