module.exports = function(grunt) {

    // 1. Всё конфигурирование тут
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            // 2. Конфигурация для объединения файлов тут.
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'js/**/*.js', // Все JS в папке js
                    'tests/HanoiModel.js'  // Какой-то файл
                ],
                dest: 'build/<%= pkg.name %>.js',
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'build'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> /\n'
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['tests/UnitTests.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js', 'tests/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    laxcomma: true
                }
            }
        },
        jscoverage: {
            src: {
                expand: true,
                cwd: 'js/',
                src: ['**/*.js'],
                dest: 'build/js-cov/',
                ext: '.js',
            },
            otherstuff: {
                expand: true,
                cwd: 'otherstuff/',
                src: ['**/*.js'],
                dest: 'otherstuff-cov/',
                ext: '.js',
            },
            options: {
                // custom options
                encoding: 'utf8'
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        } 
    });

    // 3. Здесь мы сообщаем Grunt, что мы планируем использовать этот плагин:
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-jscoverage");

    // 4. Мы сообщаем Grunt, что нужно делать, когда мы введём "grunt" в терминале.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
    grunt.registerTask('test', ['jshint', 'qunit']);

};
