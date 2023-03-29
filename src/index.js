const express = require('express');
const bodyParser = require('body-parser');
const routerAuth = require('./routes/auth')
const routerUser = require('./routes/user')



const dotenv = require('dotenv');
const ensureAuthenticated = require('./middleware/auth.js')
const cors = require('cors');
const routerMovie = require('./routes/movie.js');
const routerBook = require('./routes/book.js');
const routerMoviesApi = require('./routes/sycnmovie.js');
const routerBooksApi = require('./routes/syncbook.js');
const db = require('./models/index.js')


dotenv.config();

const startApp = async () => {

    // await db.sequelize.sync({force: false});
    const app = express();

    app.use(cors())

    const port = process.env.PORT;

    app.use(bodyParser.json());
    app.use(express.json());


    //app.use(ensureAuthenticated)
//   app.use('/all', routerAll);
    app.use('/auth', routerAuth)
    app.use('/users', routerUser)
  
    app.use('/movies', routerMovie);
    app.use('/books', routerBook);
    app.use('/sync-api', routerMoviesApi);
    app.use('/sync-apiRovers', routerBooksApi);

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
