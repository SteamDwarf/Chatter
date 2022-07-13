interface user {
    id: string;
    userName: string
}

let users: user[] = [];

//TODO настроить проверку уникальность имени
/* exports.checkUniqUsername = (userName) => {
    if(users.find((joinedUser) => joinedUser.userName === userName)) {
        return false
    }

    return true;
} */

export const addUser = (user: user) => {
    if(!users.find((joinedUser) => joinedUser.userName === user.userName)) {
        users.push(user);
        console.log(users);
    }
    
}

export const deleteUser = (userId: string) => {
    users = users.filter((joinedUser) => joinedUser.id !== userId);

    console.log(users);
}

export const getUsers = () => users;