"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createActions = function (key, mapDispatchToAC) {
    var actionCreator = [];
    for (var action in mapDispatchToAC) {
        if (Object.prototype.hasOwnProperty.call(mapDispatchToAC, action)) {
            if (typeof mapDispatchToAC[action] === "function") {
                var actionType = "".concat(key, "/").concat(mapDispatchToAC[action].name);
                actionCreator.push({
                    type: actionType,
                    actionCreator: mapDispatchToAC[action],
                });
            }
            else {
                var actionType = "".concat(key, "/").concat(action);
                actionCreator.push({
                    type: actionType,
                });
            }
        }
    }
    return actionCreator;
};
exports.default = createActions;
