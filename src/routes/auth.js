import { signup, login } from '../controlers/auth.js';
import { Router } from 'express';
const routerAuth = Router();

routerAuth.post('/signup', async (req, res) => {

    try {
        const { email, password } = req.body
        console.log(email)



        if (!email || !password) {
            res.status(502).json("incorrect email or password");
        }
        const token = await signup({ email, password })
        res.status(200).json(token)

    } catch (error) {
        res.status(500).json(error.message)
    }
})



export default routerAuth;