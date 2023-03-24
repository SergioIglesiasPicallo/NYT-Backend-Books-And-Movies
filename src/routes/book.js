const { getBookList, getBookId, updateBook, deleteBook } = require('../controlers/book')
const Router = require('express').Router;
const routerBook = Router()
const db = require("../models/index.js").default.default;
const Book = db.book


routerBook.get('/', async (req, res) => {
    try {
        const books = await getBookList()
        res.status(200).json(books)
    } catch (error) {
        res.status(500)
    }
})


routerBook.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getBookId(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error.message)
    }
});


routerBook.post('/', async (req, res) => {

    try {
        const { title } = req.body
        const exists = await Book.findOne({ where: { title } })
        if (!exists) {
            const bodyData = req.body
            await Book.create(bodyData)
            res.status(200).json(bodyData)
        } else {
            res.status(200).json("Book already Exists")
        }

    } catch (error) {
        console.log(error)
        res.status(500).json('Document creation failed')
    }
})

routerBook.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const task = await updateBook(id, data)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json('Document update failed')
    }
});

routerBook.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        await deleteBook(id)
        res.status(200).json('Document deleted successfully')

    } catch (error) {
        res.status(500)
    }


});


module.exports = routerBook

