import { IMessage } from "../ts-features/interfaces";
 
 const messages: Map<string, IMessage[]> = new Map();
 
 export const getMessages = (userName: string) => {
    return messages.get(userName) || [];
 }
 
 export const saveMessage = (contactName: string, message: IMessage) => {
    const contactMessages = messages.get(contactName);

    contactMessages ? contactMessages.push(message) : messages.set(contactName, [message]);
 }