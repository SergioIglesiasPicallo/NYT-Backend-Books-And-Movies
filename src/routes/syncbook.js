const Router = require('express').Router;
const apiCallBook = require("../services/api").apiCallBooks
const routerBooksApi = Router();

routerBooksApi.get('/', async (req, res) => {
    try {

        await apiCallBook()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json('No new documents found')
    }
})


module.exports = routerBooksApi