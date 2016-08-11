import { version } from '../../package.json';
import { Router } from 'express';
import config from '../config/config';
import article from './article';

let router = Router();

router.get('/', (req, res) => {
	res.json({ version });
});

router.use('/articles', article);

export default router;
