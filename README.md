Backbone Relational Model Persistence
=====================================
[![Build
Status](https://travis-ci.org/ShopIgniter/backbone.relational-persistence.png?branch=master)](https://travis-ci.org/ShopIgniter/backbone.relational-persistence)

###Change is hard. We try to make it suck less.

# Setup

1. Clone this repo
2. Run `npm install`
3. Run `grunt`

# But what is it?

This project aims to provide a feature set that extends backbone.relational in order to provide:

* model attribute type-enforcement
* the ability to save model aggregates of arbitrary depth. Calling save() on a RelationalModel will recursively persist the model and it's children (and the children's children, and so on...)
  - support for persisting through a relation, up or down, e.g. save the parent model first then set a join field on child(ren) relation(s) or save a child then set a join field on a parent relation.
* support for persistability (sometimes the conditions necessary to save a model are different than for validating). This allows relations to be bypassed altogether when commiting a model aggregate.
* strict enforcement of attributes which can be sent to the remote server for persistence. Sometimes it's necessary to attributes to a model that you don't want or don't need to persist.
* Support for auto-patching on updates. Backbone provides support for PATCH operations. Because relational-persistence keeps track of changedAttributes, it's possible to automatically default to using PATCH when updating models.

