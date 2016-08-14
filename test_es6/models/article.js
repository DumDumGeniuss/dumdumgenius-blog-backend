import assert from 'assert';
import Article from '../../dist/models/article';

export default (testServer, should) => {

	describe('Article Model CRUD', () => {

		let article_0;

		beforeEach((done) => {
			let newAricle = new Article({
				title: 'ready',
				content: 'to',
				category: 'delete',
				sequence: 1,
				create_at: new Date(),
				update_at: new Date()
			});
			newAricle.save((err, data) => {
				article_0 = data;
				done();
			});
		});

		afterEach((done) => {
			Article.collection.drop();
			done();
		});

		it('Get /articles', (done) => {
			testServer.get('/api/articles')
				.end((err, res) => {
					res.should.have.status(200);
      				res.should.be.json;
          			res.body.should.have.property('data');
					res.body.data.should.be.a('array');
          			res.body.data[0].should.have.property('title');
          			res.body.data[0].should.have.property('content');
          			res.body.data[0].should.have.property('category');
          			res.body.data[0].should.have.property('sequence');
					res.body.data[0].title.should.equal('ready');
					res.body.data[0].content.should.equal('to');
					res.body.data[0].category.should.equal('delete');
          			res.body.data[0].sequence.should.equal(1);
					done();
				});
		});

		it('POST /articles', (done) => {
			testServer.post('/api/articles')
				.send({
					title: 'hello',
					content: 'world',
					category: '!',
					sequence: 2,
					create_at: new Date(),
					update_at: new Date()
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
          			res.body.should.have.property('data');
          			res.body.data.should.have.property('title');
          			res.body.data.should.have.property('content');
          			res.body.data.should.have.property('category');
          			res.body.data.should.have.property('sequence');
					res.body.data.title.should.equal('hello');
					res.body.data.content.should.equal('world');
					res.body.data.category.should.equal('!');
					res.body.data.sequence.should.equal(2);
					done();
				});
		});
		it('Get /articles/:id', (done) => {
			testServer.get('/api/articles/' + article_0._id)
				.end((err, res) => {
					res.should.have.status(200);
      				res.should.be.json;
          			res.body.should.have.property('data');
          			res.body.data.should.have.property('title');
          			res.body.data.should.have.property('content');
          			res.body.data.should.have.property('category');
          			res.body.data.should.have.property('sequence');
      				res.body.data.title.should.equal('ready');
      				res.body.data.content.should.equal('to');
      				res.body.data.category.should.equal('delete');
					res.body.data.sequence.should.equal(1);
					done();
				});
		});
		it('PUT /articles/:id', (done) => {
			testServer.put('/api/articles/' + article_0._id)
				.send({
					title: 'aloha',
					content: 'again',
					category: '~',
					sequence: 2,
					update_at: new Date()
				})
				.end((err, res) => {
					res.should.have.status(200);
      				res.should.be.json;
          			res.body.should.have.property('data');
          			res.body.data.should.have.property('title');
          			res.body.data.should.have.property('content');
          			res.body.data.should.have.property('category');
          			res.body.data.should.have.property('sequence');
      				res.body.data.title.should.equal('aloha');
      				res.body.data.content.should.equal('again');
      				res.body.data.category.should.equal('~');
					res.body.data.sequence.should.equal(2);
      				res.body.data._id.should.equal(article_0._id + '');
					done();
				});
		});
		it('DELETE /articles/:id', (done) => {
			testServer.delete('/api/articles/' + article_0._id)
				.end((err, res) => {
					res.should.have.status(200);
      				res.should.be.json;
          			res.body.should.have.property('data');
          			res.body.data.should.have.property('ok');
          			res.body.data.should.have.property('n');
      				res.body.data.ok.should.equal(1);
      				res.body.data.n.should.equal(1);
					done();
				});
		});
	});
};

