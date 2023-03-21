const router = require('express').Router;
const jsonwebtoken = require('jsonwebtoken');
const{
    updateUserFavListPost,
    getUserFavourites,
} = require('../controlers/user');
const getUserByEmail = require('../controlers/user').getUserByEmail;
const userRouter = Router();