interface IUser {
    id: string;
    userName: string;
    messages: [];
    sentNewMessage: boolean;
    color: string;
}

let users: IUser[] = [];

//TODO настроить проверку уникальность имени
/* exports.checkUniqUsername = (userName) => {
    if(users.find((joinedUser) => joinedUser.userName === userName)) {
        return false
    }

    return true;
} */

export const addUser = (user: IUser) => {
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