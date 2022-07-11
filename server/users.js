let users = [];

//TODO настроить проверку уникальность имени
exports.checkUniqUsername = (userName) => {
    if(users.find((joinedUser) => joinedUser.userName === userName)) {
        return false
    }

    return true;
}

exports.addUser = (user) => {
    if(!users.find((joinedUser) => joinedUser.userName === user.userName)) {
        users.push(user);
        console.log(users);
    }
    
}

exports.deleteUser = (userId) => {
    users = users.filter((joinedUser) => joinedUser.id !== userId);

    console.log(users);
}

exports.getUsers = () => users;