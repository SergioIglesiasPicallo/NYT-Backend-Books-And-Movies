import { Router } from 'express';
import { apiCallBooks as apiCallBook } from "../services/api";
const routerBooksApi = Router();

routerBooksApi.get('/', async (req, res) => {
    try {

        await apiCallBook()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json('No new documents found')
    }
})


export default routerBooksApi