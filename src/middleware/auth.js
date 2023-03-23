import { decode } from 'jsonwebtoken';
import db from '../models/index.js';
const User = db.User;

const ensureAuthenticated = async (req, res, next) => {
    if (req.path.includes('/auth')) return next();

    !req.headers.authorization &&
        res.status(403).json({ message: 'You are not authenticated' });

    const token = req.headers.authorization.split(' ')[1];

    !token && res.status(403).json({ message: 'Invalid token' });

    const payload = decode(token, process.env.TOKEN_SECRET);

    !payload ||
        (!payload.email && res.status(403).json({ message: 'Invalid token' }));

    const user = await User.findOne({ where: { email: payload.email } });

    !user && res.status(403).json({ message: 'Invalid token' });

    req.user = user;

    return next();
};

export default ensureAuthenticated;
