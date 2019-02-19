import express from 'express';
import path from 'path';
//import open from 'open';
import compression from 'compression';
// require('dotenv').config();

/*eslint-disable no-console, no-unused-vars */
const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
	// res.sendFile('index.html', { root: __dirname }); //SIMULATE PROD LOCALLY
	res.sendFile(path.join(__dirname, '/dist/index.html')); //TO DEPLOY
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		//open(`http://localhost:${port}`);
		console.log(`App is running at http://localhost:${port}`);
	}
});
