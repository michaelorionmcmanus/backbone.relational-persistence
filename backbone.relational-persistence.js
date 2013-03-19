(function(window) {
"use strict"

// Localize global dependency references.
var Backbone = window.Backbone;
var _ = window._;
var $ = window.$;
var OriginalConstructor = Backbone.RelationalModel.prototype.constructor;

/**
@class RelationalPersistence
@extends Backbone.RelationalModel
*/
var RelationalPersistence = Backbone.RelationalModel.extend({
  /**
    Constructor override

    @method constructor
    @for RelationalPersistence
  **/
	constructor: function() {
    // Bind to the sync even to set original attributes.
    this.on('sync', this.setOriginalAttributes);
    // Bind to the destroy event to remove sync binding.
		this.once('destroy', this.unbindOriginalAttributes);
    // Call the parent constructor
		OriginalConstructor.apply(this, arguments);
	},

  /**
    The model's original attributes. Initialized in
    {{#crossLink "RelationalPersistence/setOriginalAttributes:method"}}{{/crossLink}}

    @protected
    @property _originalAttributes
  **/
  _originalAttributes: [],

  /**
    Set the original attributes on the model. Typically called when the model is synced with
    the remote data store.

    @method setOriginalAttributes
    @return {void}
  **/
  setOriginalAttributes: function() {
    this._originalAttributes = _.clone(this.attributes);
  },

  /**
    Unbinds the call to {{#crossLink "RelationalPersistence/setOriginalAttributes:method"}}{{/crossLink}} from 
    the "sync" event.

    @method unbindOriginalAttributes
    @return {void}
  **/
  unbindOriginalAttributes: function() {
    this.off('sync', this.setOriginalAttributes);
  },

  /**
    Restore the last known "clean" set of attributes. Use `Backbone.Model.prototype.set` to restore the 
    attributes since `Backbone.RelationalModel` overrides `set` to handle relations. 

    @method restoreOriginalAttributes
    @return {void}
  **/
  restoreOriginalAttributes: function() {
    // Call set using the Backbone.Model prototype, since we arent' concerned with updating relations. 
    // If we end up needing to reset relations, we should probably act on those independently.
    Backbone.Model.prototype.set.call(this, this._originalAttributes);
  },

  /**
    Check to see whether or not the model is dirty. Compares {{#crossLink "RelationalPersistence/_originalAttributes:property"}}{{/crossLink}}
    to `this.attributes`.


    @method isDirty
    @return {boolean} `true` if the model is dirty, `false` otherwise.
  **/
  isDirty: function() {
    return !_.isEqual(this.attributes, this._originalAttributes);
  },
});

// Export!
Backbone.RelationalModel = RelationalPersistence;

})(typeof global === "object" ? global : this);