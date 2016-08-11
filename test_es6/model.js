process.env.NODE_ENV = 'test';

// import config from '../dist/config/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/index';
import article from './models/article';

//chai
const should = chai.should();
chai.use(chaiHttp);
const testServer = chai.request(server);


//test models' CRUD
article(testServer, should);

