const db = require("../models/index.js").default;
const Movie = db.movie

const getMovieList = async () => {
    try {
        const movieList = await Movie.findAll();
        return movieList

    } catch (error) {
        console.log(error);
    }
}

const getMovieId = async (id) => {

    const movieId = await Movie.findByPk(id)
    return movieId
}


const createMovie = async ({ title, explanation, url, date }) => {

    try {

        const exists = await Movie.findOne({ where: { title: title } })
        if (!exists) {
            const createMovie = await Movie.create({ title, explanation, url, date })
            return createMovie
        }

    } catch (error) {
        console.log("DOCUMENTO YA ESTA CREADO")

    }

}

const updateMovie = async (id, data) => {

    const movieUpdate = await Movie.update(data, {
        where: { id }
    });
    return movieUpdate
}

const deleteMovie = async (id) => {
    await Movie.destroy({
        where: { id }
    })
    return true
}

module.exports = { getMovieList, getMovieId, createMovie, updateMovie, deleteMovie }