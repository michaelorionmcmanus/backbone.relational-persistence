# Grunt configuration updated to latest Grunt.  That means your minimum
# version necessary to run these tasks is Grunt 0.4.
#
# Please install this locally and install `grunt-cli` globally to run.
module.exports = ->

  # Initialize the configuration.
  @initConfig
    pkg: @file.readJSON('package.json')
    # Lint source, node, and test code with some sane options.
    jshint:
      files: ["backbone.layoutmanager-persistence.js", "node/index.js"]

      # Allow certain options.
      options:
        browser: true
        boss: true
        immed: false
        eqnull: true
        globals: {}

    # Run QUnit tests for browser environments.
    qunit:
      files: ["test/index.html"]

    # Run QUnit tests for Node.js environments.
    nodequnit:
      files: ["test/*.js", "!test/dom.js"]

      options:
        deps: ["test/vendor/util.js"]
        code: "."
        testsDir: "test/"

    # Generate documentation with YUI doc
    yuidoc:
      compile:
        name: '<%= pkg.name %>'
        description: '<%= pkg.description %>'
        version: '<%= pkg.version %>'
        url: '<%= pkg.homepage %>'
        options:
          paths: './'
          outdir: 'docs'
        
  # Load external Grunt task plugins.
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-qunit"
  @loadNpmTasks "grunt-nodequnit"
  @loadNpmTasks "grunt-contrib-yuidoc"

  # Default task.
  @registerTask "default", ["jshint", "qunit", "nodequnit", "yuidoc"]
