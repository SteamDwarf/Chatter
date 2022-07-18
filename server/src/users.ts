export interface IMessage {
    id: string;
    content: string;
    from: string;
    to: string;
    date: string;
}

export interface IUserMessage {
    userName: string;
    messages: IMessage[];
}


export interface IUser {
    id: string;
    userName: string;
    messages: IUserMessage[];
    sentNewMessage: boolean;
    color: string;
    isOnline: boolean;
}

let users: IUser[] = [];

//TODO настроить проверку уникальность имени
/* exports.checkUniqUsername = (userName) => {
    if(users.find((joinedUser) => joinedUser.userName === userName)) {
        return false
    }

    return true;
} */

export const findUser = (userName: string) => {
    return users.find(user => user.userName === userName);
}

export const addUser = (user: IUser) => {
    users = [...users, user];
    console.table(users);
}

export const connectUser = (user: IUser) => {
    const otherUsers = users.filter(otherUser => otherUser.userName !== user.userName);

    users = [...otherUsers, user];
    console.table(users);
}

export const disconnectUser = (userName: string) => {
    const connectedUser = findUser(userName);
    const otherUsers = users.filter(otherUser => otherUser.userName !== userName);

    if(connectedUser?.id) {
        users = [...otherUsers, {...connectedUser, isOnline: false}];
    }
    
    console.table(users);
}

export const addMessage = (messageData: IMessage) => {
    const sender = users.find(user => user.userName === messageData.from);
    const recipient = users.find(user => user.userName === messageData.to);

    if(sender && recipient) {
        const senderMessages = sender.messages.find(mesObj => mesObj.userName === recipient.userName);
        const recipientMessages = recipient.messages.find(mesObj => mesObj.userName === sender.userName);

        senderMessages 
            ? senderMessages.messages.push(messageData) 
            : sender.messages.push({userName: recipient.userName, messages: [messageData]});

        recipientMessages 
            ? recipientMessages.messages.push(messageData)
            : recipient.messages.push({userName: sender.userName, messages: [messageData]});

    }
}

/* 
export const deleteUser = (userId: string) => {
    users = users.filter((joinedUser) => joinedUser.id !== userId);

    console.log(users);
} */

export const getUsers = () => users;