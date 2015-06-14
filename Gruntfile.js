'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      app: {
        src: ['app/vendor/**/*', 'app/app.js']
      }
    },

    browserify: {
      options: {
        transform: ['reactify']
      },
      dev: {
        src: 'components/app.jsx',
        dest: 'app/app.js',
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      },
      dist: {
        src: 'components/app.jsx',
        dest: 'app/app.js',
        options: {
          browserifyOptions: {
            debug: false
          }
        }
      }

    },

    copy: {
      main: {
        files: [
          {expand: true, cwd:'node_modules/bootstrap/dist/', src: ['**'], dest: 'app/vendor/bootstrap/'},
        ],
      },
    },

  });

  grunt.registerTask('dist', [
    'clean:app',
    'copy:main',
    'browserify:dist'
  ]);

  grunt.registerTask('build', [
    'clean:app',
    'copy:main',
    'browserify:dev'
  ]);

  grunt.registerTask('default', ['build']);


};
