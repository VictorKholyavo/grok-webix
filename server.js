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

//FILMS for datasetA//

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
	db.collection('films').insertOne(req.body, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send({newid: req.body._id});
	})
})

app.put('/films/:id', function (req, res) {
	console.log('films');
	db.collection('films').updateOne(
		{ _id: ObjectID(req.params.id)},
		{$set: {rank: req.body.rank, title: req.body.title, year: req.body.year, votes: req.body.votes, rating: req.body.rating}},
		{
			upsert: false,
			multi: true
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

//USERS for datasetB//

app.get('/users', function (req, res) {
	let order = req.query.sort ? ["name", req.query.sort.name ] : [];
	dbDynamic.collection('users').find().sort(order).toArray(function (err, docs) {

		let start = req.query.start;
		let count = req.query.count;
		let arr = [];

		for (var i = 0; i < docs.length; i++){
				docs[i].id = docs[i]._id;
				delete docs[i]._id;
		}

		for (let i = start; i <= +start + +count; i++) {
			arr.push(docs[i]);
		}
		res.send({"pos": start, "data": arr, "total_count": 778});

		if (err) {
			console.log(err);
			return res.sendStatus(500)
		}
	})
})

app.get('/users/:id', function (req, res) {
	dbDynamic.collection('users').findOne(
		{ _id: req.params.id },
		function (err, docs) {
			docs.id = docs._id;
			delete docs._id
			res.send(docs)
		}
	)
})

app.put('/users/:id', function (req, res) {
	dbDynamic.collection('users').updateOne(
		{ _id: req.params.id},
		{$set: {name: req.body.name, age: req.body.age, gender: req.body.gender, company: req.body.company, favoriteFruit: req.body.favoriteFruit}},
		{
			upsert: false,
			multi: true
		},
		function (err, result) {
			if (err) return res.send({ status:"error" });
			res.send({});
		})
})

app.delete('/users/:id', function (req, res) {
	dbDynamic.collection('users').deleteOne(
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
