var paths = {
    // Declaring our distribution folder
	dist_dir: 'dist',
    // Declaring all files in our dist folder as our dist files
	dist_files: 'dist/**/*.*',


	views: {
		src: 'src/views/**/*.ejs',
		dist: 'dist/views'
	},
	styles: {
		src: 'src/styles/**/*.scss',
		dist: 'dist/public/styles'
	},
	scripts: {
		src: 'src/js/**/*.js',
		dist: 'dist/scripts'
	}
};

module.exports = {
	paths: paths,
	plugins: {
			browserSync: {
	    proxy: "localhost:4200",
	    port: 5000, 
	    files: [ 
	      paths.dist_files 
	    ],
	    browser: 'google chrome',
	    notify: true
    },
    nodemon: {
      script: 'index.js',
      ignore: [
        'gulpfile.js',
        'config/',
        'node_modules/'
      ]
    }
	}
};