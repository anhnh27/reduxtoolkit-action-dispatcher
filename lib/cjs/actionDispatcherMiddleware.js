"use strict";
/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var actionDispatcherMiddleware = function (_store) {
    exports.store = _store;
    return function (next) { return function (action) {
        next(action);
    }; };
};
exports.default = actionDispatcherMiddleware;
