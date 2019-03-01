let express = require('express');
let bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

let cors = require('cors');
let path = require('path');

let app = express();
let db;
let dbDynamic;

app.use(cors());
app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
	res.send('Hello API');
})

app.get('/users', function (req, res) {
	dbDynamic.collection('users').find().toArray(function (err, docs) {
		for (var i = 0; i < docs.length; i++){
				docs[i].id = docs[i]._id;
				delete docs[i]._id;
		}
		if (err) {
			console.log(err);
			return res.sendStatus(500)
		}
		res.send(docs);
	})
})

app.get('/films', function (req, res) {
	db.collection('films').find().toArray(function (err, docs) {
		for (var i = 0; i < docs.length; i++){
				docs[i].id = docs[i]._id;
				delete docs[i]._id;
		}

		if (err) {
			console.log(err);
			return res.sendStatus(500)
		}
		res.send(docs);
	})
})

app.get('/films/:id', function (req, res) {
	db.collection('films').findOne({ _id: ObjectID(req.params.id) }, function (err, docs) {
		docs.id = docs._id;
		delete docs._id
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	})
})

app.post('/films', function (req, res) {
	let artist = {
		newid: req.body._id,
		name: req.body.name
	};

	db.collection('films').insertOne(req.body, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send({newid: req.body._id});
	})
})

app.put('/films/:id', function (req, res) {
	db.collection('films').updateOne(
		{ _id: ObjectID(req.params.id)},
		{$set: {rank: req.body.rank, title: req.body.title, year: req.body.year, votes: req.body.votes, rating: req.body.rating}},
		{
			upsert: false,
			multi: false
		},
		function (err) {
			if (err) {
				console.log(err);
				return res.send({ status:"error" });
			}
			res.send({});
		}
	)
})

app.delete('/films/:id', function (req, res) {
	db.collection('films').deleteOne(
		{ _id: ObjectID(req.params.id)},
		function (err) {
			if (err) {
				return res.send({ status:"error" });
			}
			res.send({});
		}
	)
})

MongoClient.connect('mongodb://localhost:27017/myapi', { useNewUrlParser: true }, function (err, database) {

	if (err) {
		return console.log(err);
	}
	db = database.db('films');
	dbDynamic = database.db('users');
	app.listen(3012, function () {
		console.log('API app started');
	})
})
