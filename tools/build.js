// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console, no-unused-vars*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import fs from 'fs';
import path from 'path';
import colors from 'colors';

process.env.NODE_ENV = 'production'; // this assures the Babel dev config (for hot reloading) doesn't apply.

//Copy server file to Dist
//-------------------------
console.log(
	'Copying distServer to /dist/server.js'.blue //eslint-disable-line quotes
);

const srctFilename = 'distServer.js';
const src = path.join(__dirname, srctFilename);
const destDir = path.join('dist/server.js');

fs.copyFileSync(src, destDir);
//-------------------------

console.log(
	'Generating minified bundle for production via Webpack. This will take a moment...'
		.blue
);

webpack(webpackConfig).run((err, stats) => {
	if (err) {
		// so a fatal error occurred. Stop here.
		console.log(err.bold.red);
		return 1;
	}

	const jsonStats = stats.toJson();

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(error.red));
	}

	if (jsonStats.hasWarnings) {
		console.log('Webpack generated the following warnings: '.bold.yellow);
		jsonStats.warnings.map(warning => console.log(warning.yellow));
	}

	console.log(`Webpack stats: ${stats}`);

	// if we got this far, the build succeeded.
	console.log(
		"Your app has been compiled in production mode and written to /dist. It's ready to roll!" //eslint-disable-line quotes
			.green
	);

	return 0;
});
