import express from 'express'
import { callback } from '../controllers/auth';



const router = express.Router();

router.post('/', callback);

export default router