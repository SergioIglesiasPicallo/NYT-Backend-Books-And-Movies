import { user as _user } from "../models/index.js";
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
const saltRounds = 10;
import { getUserByEmail } from './user.js';
const User = _user;



const signup = async ({ email, password }) => {

    const existedUser = await getUserByEmail(email);

    if (existedUser) {
        throw new Error('User already exists');
    }

    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    const user = await User.create({ email, password: hashedPassword, salt })
    await user.save();

    return sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    })


}

const login = async ({ email, password }) => {

    const user = await getUserByEmail(email);
    console.log(user);

    if (!user) {
        throw new Error('User does not exist');
    }

    const match = await compare(password, user.password);
    // console.log(match)

    if (!match) {
        throw new Error('Invalid password');
    }

    return sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    })


}

export default { signup, login }