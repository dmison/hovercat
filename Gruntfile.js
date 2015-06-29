'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      app: {
        src: ['app/vendor/**/*', 'app/app.js']
      },
      osxBuild: {
        src: ['dist/osx_x64/**/*']
      },
      linuxBuild: {
        src: ['dist/linux/**/*']
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

    electron: {
      osxBuild: {
        options: {
          name: 'Hovercat',
          dir: 'app',
          out: 'dist/osx_x64',
          version: '0.26.0',
          platform: 'darwin',
          arch: 'x64'
        }
      },
      linuxBuild: {
        options: {
          name: 'Hovercat',
          dir: 'app',
          out: 'dist/linux',
          version: '0.26.0',
          platform: 'linux',
          arch: 'x64'
        }
      }
    },

    easy_rpm: {
       options: {
         // These are the bare-minimum values required to create a properly named
         // RPM package.  The plugin does contain defaults for these if you omit
         // them, and will notify you when this occurs.
         name: "hovercat",
         version: "0.0.2",
         release: 1,
         buildArch: "x86_64"
       },
       release: {
         files: [
           {cwd: 'dist/linux', src: "**/*", dest: "/opt/hovercat/"},
           {src: "Hovercat.desktop", dest: "/usr/share/applications/"},
         ]
       }
     }


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
  grunt.registerTask('linux-dist', ['build', 'clean:linuxBuild', 'electron:linuxBuild']);
  grunt.registerTask('linux-rpm', ['linux-dist', 'easy_rpm'])


};
