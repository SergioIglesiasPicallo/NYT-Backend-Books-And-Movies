const db = require("../models/index.js");
const Movie = db.movie
const Movie = require('express').Movie;
const { getMovieList, getMovieId, updateMovie, deleteMovie } = require('../controlers/movie');
const routerMovie = Movie()


routerMovie.get('/', async (req, res) => {
    try {
        const rovers = await getMovieList()
        res.status(200).json(rovers)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


routerMovie.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getMovieId(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500)
    }
});


routerMovie.post('/', async (req, res) => {
    try {
        const { nasaId } = req.body;
         const exists = await Movie.findOne({ where: { movieId } });
        if (!exists) {
            const bodyData = req.body;
            await Movie.create(bodyData);
            res.status(200).json(bodyData);
        } else {
            res.status(200).json("Movie already exists");
        }
    } catch (error) {
        console.error(error);
    }
});

routerMovie.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const task = await updateMovie(id, data)
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json('Document update failed')
    }
});

routerMovie.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        console.log(id)
        await deleteMovie(id)
        res.status(200).json('Document deleted successfully')

    } catch (error) {
        res.status(500).json(error.message)
    }


});

module.exports = routerMovie

