// import fetch from "node-fetch";
const fetch = require("node-fetch");
const db = require('../models/index.js');
const Book = db.book
const Movie = db.movie


async function apiCallBooks() {
    const response = await fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key==" + process.env.API_KEY);
    const data = await response.json();
    const newList = data.map((book) => ({
        title: book.title,
        date: book.date,
        
    }));
    // Ordenar el array por fecha en orden ascendente
    newList.sort((a, b) => new Date(b.date) - new Date(a.date));

    const books = await Book.findAll();
    const itemsToCreate = [];

    for (let element of newList) {
        const existed = apods.find((rover) => rover.nasaId == element.nasaId);
        if (!existed) {
            itemsToCreate.push(element);
        }
    }

    if (itemsToCreate.length > 0) {
        await Apod.bulkCreate(itemsToCreate);
    }
}

async function apiCallMovies() {
    const response = await fetch("https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=" + process.env.API_KEY);
    // "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=" + process.env.API_KEY
    const data = await response.json();
    const newList = data.photos.map((item) => ({
        nasaId: item.id,
        img_src: item.img_src,
        earth_date: item.earth_date,
        camera: {
            name: item.camera.name,
            full_name: item.camera.full_name
        },
    }));
    const movies = await Movie.findAll();
    const itemsToCreate = [];

    for (let element of newList) {
        const existed = movies.find((rover) => rover.nasaId == element.nasaId);
        if (!existed) {
            itemsToCreate.push(element);
        }
    }

    if (itemsToCreate.length > 0) {
        await Movie.bulkCreate(itemsToCreate);
    }
}

module.exports = { apiCallBooks, apiCallMovies };
