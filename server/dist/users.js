"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.disconnectUser = exports.connectUser = exports.addUser = exports.findUser = void 0;
var users = new Map();
//TODO настроить проверку уникальность имени
var findUser = function (userName) {
    return users.get(userName);
};
exports.findUser = findUser;
var addUser = function (user) {
    users.set(user.userName, user);
};
exports.addUser = addUser;
var connectUser = function (user) {
    var existedUser = users.get(user.userName);
    existedUser ? existedUser.isOnline = true : null;
    //console.table(users);
};
exports.connectUser = connectUser;
var disconnectUser = function (userName) {
    var existedUser = users.get(userName);
    existedUser ? existedUser.isOnline = false : null;
    //console.table(users);
};
exports.disconnectUser = disconnectUser;
/*
export const deleteUser = (userId: string) => {
    users = users.filter((joinedUser) => joinedUser.id !== userId);

    console.log(users);
} */
var getUsers = function () { return Array.from(users, function (_a) {
    var userName = _a[0], user = _a[1];
    return user;
}); };
exports.getUsers = getUsers;
//# sourceMappingURL=users.js.map