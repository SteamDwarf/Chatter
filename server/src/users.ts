export interface IUser {
    id: string;
    userName: string;
    sentNewMessage: boolean;
    color: string;
    isOnline: boolean;
}

const users: Map<string, IUser> = new Map();

//TODO настроить проверку уникальность имени
/* exports.checkUniqUsername = (userName) => {
    if(users.find((joinedUser) => joinedUser.userName === userName)) {
        return false
    }

    return true;
} */

export const findUser = (userName: string) => {
    return users.get(userName);
}

export const addUser = (user: IUser) => {
    users.set(user.userName, user);
}

export const connectUser = (user: IUser) => {
    const existedUser = users.get(user.userName);
    existedUser ? existedUser.isOnline = true : null;

    console.table(users);
}

export const disconnectUser = (userName: string) => {
    const existedUser = users.get(userName);
    existedUser ? existedUser.isOnline = false : null; 
    
    console.table(users);
}

/* 
export const deleteUser = (userId: string) => {
    users = users.filter((joinedUser) => joinedUser.id !== userId);

    console.log(users);
} */

export const getUsers = () => Array.from(users, ([userName, user]) => user);
