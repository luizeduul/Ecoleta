import express, { response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

import ValidatorPoint from './validators/ValidatorPoint';

const routes = express.Router();
const upload = multer(multerConfig);


const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', upload.single('image'), ValidatorPoint ,pointsController.create);


export default routes;