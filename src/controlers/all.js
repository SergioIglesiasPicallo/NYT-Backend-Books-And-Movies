const Book = require('../models/books');
const Movie = require('../models/movies');
const User = require('../models/user').default;

export const getAll = async () => {
    const bookList = await Book.findAll();
    const movieList = await Movie.findAll();
    const userList = await User.findAll();
    return{
        bookList,movieList,userList
    }
}