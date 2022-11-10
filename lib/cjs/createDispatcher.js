"use strict";
/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
Object.defineProperty(exports, "__esModule", { value: true });
var actionDispatcherMiddleware_1 = require("./actionDispatcherMiddleware");
var createDispatcher = function (slice) {
    var actions = slice.actions;
    var dispatcher = {};
    for (var action in actions) {
        if (Object.prototype.hasOwnProperty.call(actions, action)) {
            Object.defineProperty(dispatcher, action, {
                value: wrapDispatch(actions[action]),
                writable: false,
                enumerable: true,
                configurable: true,
            });
        }
    }
    return dispatcher;
};
var wrapDispatch = function (creator) {
    var dispatcher = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var action = creator.apply(null, args);
        return actionDispatcherMiddleware_1.store.dispatch(action);
    };
    return dispatcher;
};
exports.default = createDispatcher;
