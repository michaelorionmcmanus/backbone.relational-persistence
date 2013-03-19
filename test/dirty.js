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
test("defaults", 2, function() {
  var model = new this.Model();
  ok(_.isFunction(model.isDirty), "isDirty is a method on a Backbone.RelationalModel");
  ok(_.where(model._events['sync'], {callback:model.setOriginalAttributes}), "setOriginalAttributes is bound to sync");
});

// On sync, original attributes are set.
asyncTest("on sync with a saved model", function(){
  expect(3);

  var attributes = {
  	id: 1,
  	apple: 'banana',
  	pear: 'blueberry'
  };
  var model = new this.Model(attributes);

  model.on('sync', function() {
  	deepEqual(attributes, model._originalAttributes, "orginalAttributes property is set");
  	deepEqual(attributes, model._originalAttributes, "orginal attributes are set correctly");
  	deepEqual(model.attributes, model._originalAttributes, "orginal attributes are set correctly");
  	start();
  });

  model.trigger('sync');
});

// On destroy, the sync event to bind setting original models is unbound.
asyncTest("on destroy", function(){
  expect(1);

  var attributes = {
  	id: 1,
  	apple: 'banana',
  	pear: 'blueberry'
  };
  var model = new this.Model(attributes);  

  model.on('destroy', function() {
  	var callbacks = _.where(model._events['sync'], {callback:model.setOriginalAttributes});
  	ok((!callbacks || callbacks.length === 0), "on destroy the setOriginalAttributes method is unbound");
  	start();
  });

  model.trigger('destroy');
});

// Changing attributes after sync puts the model into a dirty state.
asyncTest("after sync, if an attribute is changed", function(){
  expect(1);

  var attributes = {
  	id: 1,
  	apple: 'banana',
  	pear: 'blueberry'
  };
  var model = new this.Model(attributes);  

  model.on('sync', function() {
  	model.set('apple', 'pear');
  	ok(model.isDirty(), 'the model is in a dirty state.');
  	start();
  });

  model.trigger('sync');
});

// Original attributes can be restored

// Changing attributes after sync puts the model into a dirty state.
asyncTest("after sync, if an attribute is changed", function(){
  expect(2);

  var attributes = {
  	id: 1,
  	apple: 'banana',
  	pear: 'blueberry'
  };
  var model = new this.Model(attributes);  

  model.on('sync', function() {
  	// Dirty things up.
  	model.set('apple', 'pear');
  	ok(model.isDirty(), 'the model is in a dirty state.');
  	// Now restore
  	model.restoreOriginalAttributes();
  	ok(!model.isDirty(), 'the model is not in a dirty state.');
  	start();
  });

  model.trigger('sync');
});



