"use strict";
/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
Object.defineProperty(exports, "__esModule", { value: true });
var actionDispatcherMiddleware_1 = require("./actionDispatcherMiddleware");
function createDispatcher(actions) {
    var facade = {};
    for (var action in actions) {
        if (Object.prototype.hasOwnProperty.call(actions, action)) {
            var type = actions[action].type;
            var actionName = type.toString().split("/")[1];
            facade[actionName] = wrapDispatch(type, actions[action].actionCreator);
        }
    }
    return facade;
}
exports.default = createDispatcher;
var wrapDispatch = function (type, creator) {
    var dispatcher = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var payload = typeof creator === "function" ? creator.apply(null, args) : creator;
        var action = {
            type: (payload === null || payload === void 0 ? void 0 : payload.type) || type,
            payload: payload,
        };
        return actionDispatcherMiddleware_1.store.dispatch(action);
    };
    dispatcher.name = dispatcher.toString = function () { return type; };
    dispatcher.type = type;
    return dispatcher;
};
