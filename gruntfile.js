module.exports = function(grunt) {
  // Load tasks
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-open");
  grunt.loadNpmTasks("grunt-serve");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      server: {
        options: {
          base: ".", // current directory for 'index.html' is root
          keepalive: true, // keep the server alive indefinitely
          open: {
            target: "http://localhost:3030"
          },
          port: 3030, // custom port
          useAvailablePort: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "assets/js/**/*.js", "!assets/build/app.min.js"]
    },
    open: {
      server: {
        url: "http://localhost:<%= connect.options.port %>"
      }
    },
    sass: {
      dist: {
        options: {
          style: "compressed",
          compass: false,
          sourcemap: false
        },
        files: {
          "build/app.min.css": ["scss/app.scss"]
        }
      }
    },
    serve: {
      options: {
        port: 9000
      }
    },
    uglify: {
      dist: {
        files: {
          "build/app.min.js": ["js/**/*.js"]
        },
        options: {
          sourceMap: "build/app.min.js.map",
          sourceMappingURL: "build/app.min.js.map"
        }
      }
    },
    watch: {
      options: {
        livereload: 35729
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["sass"]
      }
    }
    // watch: {
    //   livereload: {
    //     css: {
    //       files: [
    //         "{,*/}*.{html,css,png,jpg,gif,svg}"
    //       ],
    //       tasks: ['sass']
    //     },
    //     options: {
    //       livereload: 37529
    //     }
    //   }
    // }
  });

  // Register tasks
  grunt.registerTask("default", ["sass", "uglify"]);

  grunt.registerTask("buildcss", "Compile stylesheet", ["sass"]);

  grunt.registerTask(
    "server",
    "Open static server and live reload on localhost",
    ["connect:livereload", "open", "watch"]
  );

  grunt.registerTask("test", ["connect", "serve", "watch"]);

  grunt.registerTask("dev", ["connect", "serve", "watch"]);
};
