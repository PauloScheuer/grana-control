import express from 'express';
const routes = express.Router();
import transactionController from '../controllers/transactionController.js';

routes.post('/create', transactionController.create);
routes.get('/findOne/:id', transactionController.findOne);
routes.get('/findAll', transactionController.findAll);
routes.delete('/delete/:id', transactionController.remove);
routes.put('/edit/:id', transactionController.update)

export default routes;
