import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let DrawingsSchema = new Schema({
	fileName: String,
	content: String,
	create_at: Date,
	update_at: Date
});

let Drawings = mongoose.model('Drawings', DrawingsSchema);

export default Drawings;