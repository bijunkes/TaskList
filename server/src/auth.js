import jwt from 'jsonwebtoken'

const SECRET_KEY = '123456'

export function gerarToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'})
}

export function verificarToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY)
    } catch (error) {
        return null
    }
}

export function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        const user = jwt.verify(token, SECRET_KEY)
        req.user = user
        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}