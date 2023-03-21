const db = require("../models/index.js");
const Book = db.book

const getBookList = async () => {
    try {
        const bookList = await Book.findAll();
        return bookList

    } catch (error) {
        console.log(error);
    }
}

const getBookId = async (id) => {

    const bookId = await Book.findByPk(id)
    return bookId
}


const createBook = async ({ title, explanation, url, date }) => {

    try {

        const exists = await Book.findOne({ where: { title: title } })
        if (!exists) {
            const createBook = await Book.create({ title, explanation, url, date })
            return createBook
        }

    } catch (error) {
        console.log("DOCUMENTO YA ESTA CREADO")

    }

}

const updateBook = async (id, data) => {

    const bookUpdate = await Book.update(data, {
        where: { id }
    });
    return bookUpdate
}

const deleteBook = async (id) => {
    await Book.destroy({
        where: { id }
    })
    return true
}

module.exports = { getBookList, getBookId, createBook, updateBook, deleteBook }