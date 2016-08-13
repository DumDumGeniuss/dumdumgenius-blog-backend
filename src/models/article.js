import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
	title: String,
	content: String,
	category: String,
	sequence: Number,
	create_at: Date,
	update_at: Date
});

let Article = mongoose.model('Article', ArticleSchema);

export default Article;