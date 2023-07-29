import auth from './services/auth'

const checkToken = async (req, res, next) => {
    console.log('[Middleware] Check token validity')
    const token = req.header('Authorization')
    console.log(`Token is: ${token}`)
    if(await auth.token.validate(token)) { 
        console.log('> Token is valid!')
        next()
    }
    else { 
        console.log('> Token is NOT valid.')
        res.sendStatus(401) // Unauthorized
    } 
}

export {
    checkToken
}