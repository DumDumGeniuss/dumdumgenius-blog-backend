import { version } from '../../package.json';
import { Router } from 'express';
import config from '../config/config';
import article from './article';
import drawings from './drawings';
import files from './files';

let router = Router();

router.get('/', (req, res) => {
	res.json({ version });
});

router.use('/articles', article);
router.use('/drawings', drawings);
router.use('/files', files);

export default router;
