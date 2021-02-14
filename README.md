# Gulp Boilerplate [![Build Status](https://travis-ci.org/cferdinandi/gulp-boilerplate.svg)](https://travis-ci.org/cferdinandi/gulp-boilerplate)

A boilerplate for building web projects with [Gulp](https://gulpjs.com/). Uses Gulp 4.x.

**Features**

- Concatenate, minify, and lint JavaScript.
- Compile, minify, autoprefix, and lint Sass.
- Optimize SVGs.
- Copy static files and folders into your `dist` directory.
- Automatically add headers and project details to JS and CSS files.
- Create polyfilled and non-polyfilled versions of JS files.
- Watch for file changes, and automatically recompile build and reload webpages.

**Gulp Boilerplate makes it easy to turn features on and off**, so you can reuse it for all of your projects without having to delete or modify tasks.



## Getting Started

### Dependencies

*__Note:__ if you've previously installed Gulp globally, run `npm rm --global gulp` to remove it. [Details here.](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)*

Make sure these are installed first.

- [Node.js](http://nodejs.org)
- [Gulp Command Line Utility](http://gulpjs.com) `npm install --global gulp-cli`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files and dependencies.
3. When it's done installing, run one of the task runners to get going:
	- `gulp` manually compiles files.
	- `gulp watch` automatically compiles files and applies changes using [BrowserSync](https://browsersync.io/) when you make changes to your source files.

**Try it out.** After installing, run `gulp` to compile some test files into the `src/css/` directory. Or, run `npm start` and make some changes to see them recompile automatically.


### package.json

The `package.json` file holds all of the details about your project.

Some information is automatically pulled in from it and added to a header that's injected into the top of your JavaScript and CSS files.

```json
{
  "name": "systest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "gulp && live-server src --verbose"
  },
  "keywords": [],
  "author": "Kalu Singh(keshav)",
  "license": "MIT",
  "devDependencies": {
    "del": "^6.0.0",
    "gulp": "^4.0.2",
    "gulp-sass": "^4.1.0"
  }
}

```

*__Note:__ `devDependencies` are the dependencies Gulp uses. Don't change these or you'll break things. If any of the other fields are removed, make sure to remove reference to them in the Header (under `var banner` in `gulpfile.js`) or `gulp watch` won't run.*


### Sass

Put your [Sass](https://sass-lang.com/) files in the `src/sass` directory.

Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you.



### Copy Files

Files and folders placed in the `src/css/` directory will be 
This is a great place to put HTML files, images, and pre-compiled assets.



## Options & Settings

Gulp Boilerplate makes it easy to customize for projects without having to delete or modify tasks.

Options and settings are located at the top of the `gulpfile.js`.

### Settings

Set features under the `settings` variable to `true` to turn them on (default), and `false` to turn them off.

```js
/**
 * Settings
 * Turn on/off build features
 */

var settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	svgs: true,
	copy: true,
	reload: true
};
```

### Paths

Adjust the `input` and `output` paths for all of the Gulp tasks under the `paths` variable. Paths are relative to the root project folder.

```js
/**
 * Paths to project folders
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('clean', () => {
    return del([
        'src/css/main.css',
    ]);
});
gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});

gulp.task('default', gulp.series(['clean', 'styles']));```

### Header

Gulp auto-injects a header into all of your JavaScript and CSS files with details from your `package.json` file.

You can change what's included under the `banner` variable.

```js
/**
 * Template for banner to add to file headers
 */

var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};
```



## License

The code is available under the [MIT License](LICENSE.md).
