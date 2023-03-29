const fetch = require("node-fetch");
const db = require('../models/index.js');
const Book= db.book
const Movie = db.movie

async function apiCallBooks() {
    try {
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" +
          process.env.API_KEY
      );
      const data = await response.json();
      const newList = data.results.books.map((book) => ({
        title: book.title,
        date: book.published_date,
        //Faltan campos
      }));
      // Ordenar el array por fecha en orden ascendente
      newList.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      const books = await Book.findAll();
      const itemsToCreate = [];
  
      for (let element of newList) {
        const existed = books.find((book) => book.title == element.title);
        if (!existed) {
          itemsToCreate.push(element);
        }
      }
  
      if (itemsToCreate.length > 0) {
        await Book.bulkCreate(itemsToCreate);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function apiCallMovies() {
    try {
      const response = await fetch(
        "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=" +
          process.env.API_KEY
      );
      const data = await response.json();
      const newList = data.results.map((movie) => ({
        title: movie.display_title,
        date: movie.publication_date,
        summary: movie.summary_short,
        image: movie.multimedia ? movie.multimedia.src : null,
      }));
      newList.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      const movies = await Movie.findAll();
      const itemsToCreate = [];
  
      for (let element of newList) {
        const existed = movies.find((movie) => movie.title == element.title);
        if (!existed) {
          itemsToCreate.push(element);
        }
      }
  
      if (itemsToCreate.length > 0) {
        await Movie.bulkCreate(itemsToCreate);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = { apiCallBooks, apiCallMovies };
  