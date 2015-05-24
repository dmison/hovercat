'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      app: {
        src: ['app/scripts/vendor/**/*', 'app/app.js']
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

    }
  });

  grunt.registerTask('dist', [
    'clean:app',
    'browserify:dist'
  ]);

  grunt.registerTask('build', [
    'clean:app',
    'browserify:dev'
  ]);

  grunt.registerTask('default', ['build']);


};
