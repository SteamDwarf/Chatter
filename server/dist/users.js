"use strict";
var users = [];
//TODO настроить проверку уникальность имени
/* exports.checkUniqUsername = (userName) => {
    if(users.find((joinedUser) => joinedUser.userName === userName)) {
        return false
    }

    return true;
} */
exports.addUser = function (user) {
    if (!users.find(function (joinedUser) { return joinedUser.userName === user.userName; })) {
        users.push(user);
        console.log(users);
    }
};
exports.deleteUser = function (userId) {
    users = users.filter(function (joinedUser) { return joinedUser.id !== userId; });
    console.log(users);
};
exports.getUsers = function () { return users; };
//# sourceMappingURL=users.js.map