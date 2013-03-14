"use strict";

/* 
 * Test Module: Configure
 * Ensures that configuration settings have correct defaults, initialization,
 * overriding, and functionality.
 *
 */
QUnit.module("dirty tools", {
  setup: function() {
    this.Model = Backbone.RelationalModel;
  },

  teardown: function() {

  }
});

// Ensure the correct defaults are set.
test("defaults", 1, function() {
  var model = new this.Model();
  ok(_.isFunction(model.isDirty), "isDirty is a method on a Backbone.RelationalModel");
});

