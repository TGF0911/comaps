import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import CompanyController from './controllers/CompanyController';

const upload = multer(uploadConfig);
const routes = Router();

routes.post('/company', upload.array('images') ,CompanyController.create);
routes.get('/company', CompanyController.index);

export default routes;