import { Router } from 'express';
import { apiCallMovies as apiCallMovie } from "../services/api";
const routerMoviesApi = Router();

routerMoviesApi.get('/', async (req, res) => {
    try {

        await apiCallMovie()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json('No new documents found')
    }
})


export default routerMoviesApi