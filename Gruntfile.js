module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src : {
      js : 'app',
      css : 'assets/css',
      images : 'assets/images',
      views : 'views',
      components : 'bower_components',
      publicHTML : 'public_html'
    },
    dist : {
      js : 'dist/app',
      css : 'dist/assets/css',
      images : 'dist/assets/images',
      views : 'dist/views',
      components : 'dist/components'
    },

    watch: {
      scripts: {
        files: ['<%= src.css %>/**', '<%= src.js %>/**', '<%= src.views %>/**', '<%= src.publicHTML %>/*'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dist.css %>/rl.css': '<%= src.css %>/rl.scss'
        }
      }
    },

    uglify: {
      js: {
        options: {
          mangle:false,
          beautify: true,
          compress : false
        },
        files: {
          '<%= dist.js %>/rl.js': ['<%= src.js %>/*.js', '<%= src.js %>/**/*.*']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand : true,
          cwd : '<%= src.images %>',
          src : ['*.{png,jpg,gif}'],
          dest : '<%= dist.images %>'
        }]
      }
    },

    copy: {
      main: {
        expand: true,
        nonull: true,
        cwd: '<%= src.components %>/',
        src: ['*', '**'],
        dest: '<%= dist.components %>/'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: '<%= src.views %>',
        src: ['**/*.html'],
        dest: '<%= dist.views %>/'
      },

      main : {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand : true,
        cwd: '<%= src.publicHTML %>',
        src: ['*.html'],
        dest: './'
      }
    },

    ngtemplates:  {
      Rise:        {
        src:      ['<%= dist.views %>/*.html', '<%= dist.views %>/**/*.html'],
        dest:     '<%= src.js %>/templates/templates.js'
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-angular-templates');

  // register tasks
  grunt.registerTask('imgmin', ['imagemin']);
  grunt.registerTask('cp', ['copy']);
  grunt.registerTask('default', ['sass', 'htmlmin:dist', 'ngtemplates', 'uglify', 'htmlmin:main']);

};