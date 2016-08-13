import { Router } from 'express';
import Article from '../models/article';

let routes = Router();

/*
GET /articles
*/
routes.get('/', (req, res) => {
	let query = req.query || {}
	Article.find(query, (err, articles) => {
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

/*
POST /articles
*/
routes.post('/', (req, res) => {
	console.log(req.body);
	let article = new Article();
	let data = req.body;
	for(var key in data) {
		article[key] = data[key];
	}
	console.log(article);
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

/*
GET /articles/:id
*/
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

/*
PUT /articles/:id
*/
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

/*
DELETE /articles/:id
*/
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

/*
GET all categories
*/
routes.get('/info/categories', (req, res) => {
	Article.collection
		.distinct("category",  (err, articles) => {
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

export default routes;