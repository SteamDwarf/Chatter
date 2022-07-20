"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessage = exports.getMessages = void 0;
var messages = new Map();
var getMessages = function (userName, contact) {
    var _a;
    return ((_a = messages.get(userName)) === null || _a === void 0 ? void 0 : _a.get(contact)) || [];
};
exports.getMessages = getMessages;
var saveMessage = function (message) {
    addMessage(message.from, message.to, message);
    addMessage(message.to, message.from, message);
};
exports.saveMessage = saveMessage;
var addMessage = function (user1, user2, message) {
    var _a;
    var senderMessages = messages.get(user1);
    if (senderMessages) {
        senderMessages.get(user2)
            ? (_a = senderMessages.get(user2)) === null || _a === void 0 ? void 0 : _a.push(message)
            : senderMessages.set(user2, [message]);
        return;
    }
    messages.set(user1, new Map([[user2, [message]]]));
};
//# sourceMappingURL=messages.js.map