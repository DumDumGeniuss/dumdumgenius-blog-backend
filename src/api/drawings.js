import { Router } from 'express';
import Drawings from '../models/drawings';
import multer from "multer";
import config from "../config/config"
import files from '../lib/files'

const drawingUpload = multer({ dest: config.drawingPath });
const drawingCpUpload = drawingUpload.fields([
    { name: 'drawing', maxCount: 1 }
]);

let routes = Router();

/*
GET /Drawings
*/
routes.get('/', (req, res) => {
	let query = req.query || {}
	Drawings.find(query).sort('sequence').exec( (err, Drawings) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				status: 'success',
				message: 'Photos query success!',
				data: Drawings
			});
		}
	});
});

/*
POST /Drawings
*/
routes.post('/', drawingCpUpload, (req, res) => {
	let drawing= new Drawings();
	let data = req.body;
	let files = req.files;
	for(var key in data) {
		drawing[key] = data[key];
	}
	drawing['fileName'] = files["drawing"][0].filename;
	drawing.save((err, Drawing) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				status: 'success',
				message: 'Drawings create success!',
				data: Drawing			
			});
		}
	});
});

/*
GET /Drawings/:id
*/
routes.get('/:id', (req, res) => {
	Drawings.findById(req.params.id, (err, Drawing) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				status: 'success',
				message: 'Drawings get success!',
				data: Drawing			
			});
		}
	});
});

/*
PUT /Drawings/:id
*/
routes.put('/:id', (req, res) => {
	Drawings.findById(req.params.id, (err, Drawing) => {
		if(err) {
			res.send(err);
		}
		let data = req.body;
		for(var key in data) {
			Drawing[key] = data[key];
		}

		Drawing((err, Drawing) => {
			if(err) {
				res.send(err);
			} else {
				res.json({
					status: 'success',
					message: 'Drawings updata success!',
					data: Drawing				
				});
			}
		});
	});
});

/*
DELETE /Drawings/:id
*/
routes.delete('/:id', (req, res) => {
	Drawings.findById(req.params.id, (err, Drawing) => {
		files.deleteDrawingFile(Drawing.fileName);
		Drawings.remove({
			_id: req.params.id
		}, (err, Drawing) => {
			if(err) {
				res.send(err);
			} else {
				res.json({
					status: 'success',
					message: 'Drawings delete success!',
					data: Drawing			
				});
			}
		});
	});
});


export default routes;