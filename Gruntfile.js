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
        transform: ['babelify']
      },
      dev: {
        src: 'components/app.jsx',
        dest: 'app/app.js',
        options: {
          browserifyOptions: {
            debug: true,
            detectGlobals: false,
            ignoreMissing: true,
            builtins: false
          }
        }
      },
      dist: {
        src: 'components/app.jsx',
        dest: 'app/app.js',
        options: {
          browserifyOptions: {
            debug: false,
            detectGlobals: false,
            ignoreMissing: true,
            builtins: false
          }
        }
      }

    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd:'node_modules/bootstrap/dist/',
            src: ['**'],
            dest: 'app/vendor/bootstrap/'
          },
          {
            expand: true,
            cwd:'node_modules/font-awesome/',
            src: ['css/**', 'fonts/**'],
            dest: 'app/vendor/font-awesome/'
          }
        ],
      },
      rpmsToRepo: {
        src: 'hovercat-*.rpm',
        dest: 'repo/'
      }
    },

    electron: {
      osxBuild: {
        options: {
          name: 'Hovercat',
          dir: 'app',
          out: 'dist/osx_x64',
          version: '0.36.0',
          platform: 'darwin',
          arch: 'x64'
        }
      },
      linuxBuild: {
        options: {
          name: 'Hovercat',
          dir: 'app',
          out: 'dist/linux',
          version: '0.36.0',
          platform: 'linux',
          arch: 'x64'
        }
      }
    },

    shell: {
      options: {
      },
      buildRepo: {
        command: 'createrepo --database repo'
      }
    },

    easy_rpm: {
       options: {
         // These are the bare-minimum values required to create a properly named
         // RPM package.  The plugin does contain defaults for these if you omit
         // them, and will notify you when this occurs.
         name: "hovercat",
         version: "0.5.0",
         release: 1,
         buildArch: "x86_64"
       },
       release: {
         files: [
           {cwd: 'dist/linux/Hovercat-linux-x64', src: "**/*", dest: "/opt/hovercat/"},
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

  grunt.registerTask('osx-dist', ['dist', 'clean:osxBuild', 'electron:osxBuild']);

  grunt.registerTask('linux-dist', ['dist', 'clean:linuxBuild', 'electron:linuxBuild']);
  grunt.registerTask('linux-rpm', ['linux-dist', 'easy_rpm']);
  grunt.registerTask('linux-repo', ['linux-rpm', 'copy:rpmsToRepo', 'shell:buildRepo']);


};
