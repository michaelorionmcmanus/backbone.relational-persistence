(function(window) {
"use strict"

// Localize global dependency references.
var Backbone = window.Backbone;
var _ = window._;
var $ = window.$;

// Override relational with the methods we want.
var RelationalPersistence = Backbone.RelationalModel.extend({
	isDirty: function() {
		return true;
	}
});

// Export!
Backbone.RelationalModel = RelationalPersistence;

})(typeof global === "object" ? global : this);