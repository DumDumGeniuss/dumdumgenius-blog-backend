import { Router } from 'express';
import Article from '../models/article';

let routes = Router();

routes.get('/', (req, res) => {
	Article.find((err, articles) => {
		if(err) {
			res.send(err);
		}
		res.json({
			status: 'success',
			message: 'articles query success!',
			data: articles
		});
	});
});

routes.post('/', (req, res) => {
	let article = new Article();
	let data = req.body;
	for(var key in data) {
		article[key] = data[key];
	}
	article.save((err, article) => {
		if(err) {
			res.send(err);
		}
		res.json({
			status: 'success',
			message: 'article create success!',
			data: article
		});
	});
});

routes.get('/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		if(err) {
			res.send(err);
		}
		res.json({
			status: 'success',
			message: 'article get success!',
			data: article
		});
	});
});

routes.put('/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		if(err) {
			res.send(err);
		}
		let data = req.body;
		for(var key in data) {
			article[key] = data[key];
		}

		article.save((err, article) => {
			if(err) {
				res.send(err);
			}
			res.json({
				status: 'success',
				message: 'article updata success!',
				data: article
			});
		});
	});
});

routes.delete('/:id', (req, res) => {
	Article.remove({
		_id: req.params.id
	}, (err, article) => {
		if(err) {
			res.send(err);
		}
		res.json({
			status: 'success',
			message: 'article delete success!',
			data: article
		});
	});
});

export default routes;