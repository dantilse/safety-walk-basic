module.exports = function(grunt) {
  // Load tasks
  grunt.loadNpmTasks('grunt-browser-sync');
  // grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // jshint: {
    //   options: {
    //     jshintrc: ".jshintrc"
    //   },
    //   all: ["Gruntfile.js", "assets/js/**/*.js", "!assets/build/app.min.js"]
    // },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: false,
          sourcemap: false
        },
        files: {
          'build/app.min.css': ['scss/app.scss']
        }
      }
    },
    // uglify: {
    //   dist: {
    //     files: {
    //       "build/app.min.js": ["js/**/*.js"]
    //     },
    //     options: {
    //       sourceMap: "build/app.min.js.map",
    //       sourceMappingURL: "build/app.min.js.map"
    //     }
    //   }
    // },
    watch: {
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['build/*.css', '*.html']
        }
      },
      options: {
        watchTask: true,
        server: './'
      }
    }
  });

  // Register tasks
  grunt.registerTask(
    'default',
    'The default Grunt task starts up a server on localhost:3000 and watches for style changes',
    ['browserSync', 'watch']
  );

  grunt.registerTask('buildcss', 'Compile stylesheet', ['sass']);

  grunt.registerTask('server', 'Task to run server on localhost:3000', [
    'browserSync',
    'watch'
  ]);
};
