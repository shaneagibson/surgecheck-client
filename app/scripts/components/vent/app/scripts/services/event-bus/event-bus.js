define([], function() {
	'use strict';

	/**
	 * @namespace vent
	 */
	
	/**
	 * @class vent.EventBus
	 * @param {Object} [opts]
	 * @param {Object} [opts.context] a default call context for consumers
	 */
	var EventBus = function (opts) {
		opts = opts || {};
		var inst = this;
		var consumers = {};
		
		/**
		 * Removes a consumer for an event
		 * @method vent.EventBus#off
		 * @param {String} eventName
		 * @param {Object} callback
		 * @param {Object} [context]
		 * @returns {Object}
		 */
		this.off = function (eventName, callback) {
			if (consumers [eventName]) {
				for (var i = 0; i < consumers [eventName].length; i++) {
					if (consumers [eventName] [i].cb === callback) {
						consumers [eventName].splice(i, 1);
					}
				}
			}
			
			return inst;
		};
		
		/**
		 * Adds a consumer for an event
		 * @method vent.EventBus#on
		 * @param {String} eventName
		 * @param {Object} callback
		 * @param {Object} [context]
		 * @returns {Object}
		 */
		this.on = function (eventName, callback, context) {
			if (!consumers [eventName]) {
				consumers [eventName] = [];
			}
			
			consumers [eventName].push({ cb: callback, context: context});
			return inst;
		};
		
		/**
		 * This is an async version of trigger. Returns the event. Synchronus call.
		 * @method vent.EventBus#trigger
		 * @param {String} eventName
		 * @param {Object} event
		 * @param {Object} [context]
		 * @returns {Object}
		 */
		this.trigger = function (eventName, event, context) {
			(consumers [eventName] || []).forEach(function (consumer) {
				consumer.cb.call(consumer.context || context || opts.context, event, eventName);
			});
			
			return event;
		};
		
		/**
		 * This is an async version of trigger.
		 * @method vent.EventBus#notify
		 * @param {String} eventName
		 * @param {Object} event
		 * @param {Object} [context]
		 * @returns vent.EventBus
		 */
		this.notify = function (eventName, event, context) {
			setTimeout(function () {
				inst.trigger(eventName, event, context);
			}, 0);
			
			return this;
		};

		
		
		if (opts.extend) {
			for (var method in this) {
				opts.extend [method] = this [method];
			}
		}
	};
	
	return EventBus;
});