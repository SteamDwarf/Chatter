export interface IMessage {
    id: string;
    content: string;
    date: string;
    from: string;
    to: string;
    files: File[]
}

export interface IUser {
    id: string;
    userName: string;
    sentNewMessage: boolean;
    color: string;
    isOnline: boolean;
}

export const defaultUser: IUser = {
    id: '', 
    userName: '', 
    sentNewMessage: false, 
    color: 'white', 
    isOnline: false
};