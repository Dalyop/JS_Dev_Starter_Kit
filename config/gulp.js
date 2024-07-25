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
		src: 'src/styles/**/*.css',
		dist: 'dist/public/styles'
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