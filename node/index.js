var fs = require("fs");
var util = require("util");

// Common dependencies
var Backbone = require("backbone");
var _ = require("underscore");

// Get Backbone and _ into the global scope.
_.defaults(global, { Backbone: Backbone, _: _ });

// Include the Relational source, without eval.
require("../backbone.relational");
require("../backbone.relational-persistence");

module.exports = Backbone.RelationalModel;