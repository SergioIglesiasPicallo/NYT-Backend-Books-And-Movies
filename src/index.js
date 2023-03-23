import express from 'express';

//  const routerMovie = require('./src/routes/movie.js');
// const routerRover = require('./src/routes/book.js');
// const routerUser = require('./src/routes/user.js');
 import routerAuth from '../src/routes/auth.js'
// const routerApodsApi = require('./src/routes/syncApiBook.js');
// const routerApiRovers = require('./src/routes/syncApiMovie.js');
// const routerAll = require('./src/routes/all.js');
 import dotenv from 'dotenv';
//  import ensureAuthenticated from './middleware/auth.js';
 import cors from 'cors';

// const routerMovie = require('./routes/movie.js');
// const routerBook = require('./routes/book.js');
// const routerMoviesApi = require('./routes/sycnmovie.js');
// const routerBooksApi = require('./routes/syncbook.js');


dotenv.config();

 const startApp = async () => {


     const app = express();

    app.use(cors())

    const port = process.env.PORT || 3000;

    // app.use(bodyParser.json());
    app.use(express.json());
//    app.use(bodyParser.urlencoded({
//         extended: true
//     }));

    //  app.use(ensureAuthenticated)

      app.use('/auth',routerAuth)
    // app.use('/users', routerUser)
    //  app.use('/all', routerAll);
    //  app.use('/movies', routerMovie);
    //  app.use('/rovers', routerBook);
    //  app.use('/sync-api', routerMoviesApi);
    //  app.use('/sync-apiRovers', routerBooksApi);

     try {
         app.listen(port, () => {
             console.log(`App listening on port ${port}`);
         })

     } catch (error) {
      console.log(error)
     process.exit(1)
    }
 }


 startApp()
