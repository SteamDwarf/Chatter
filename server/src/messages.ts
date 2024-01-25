import { writeFile } from "fs";

export interface IMessage {
   id: string;
   content: string;
   from: string;
   to: string;
   date: string;
   files: File[];
}

const messages: Map<string, Map<string, IMessage[]>> = new Map();

export const getMessages = (userName: string, contact: string) => {
   return messages.get(userName)?.get(contact) || [];
}

export const saveMessage = (message: IMessage) => {
   addMessage(message.from, message.to, message);
   addMessage(message.to, message.from, message);
   saveFiles(message.files);
}

const addMessage = (user1: string, user2: string, message: IMessage) => {
   const senderMessages = messages.get(user1);

   if(senderMessages) {
      senderMessages.get(user2) 
         ? senderMessages.get(user2)?.push(message) 
         : senderMessages.set(user2, [message]);
      return;
   }

   messages.set(user1, new Map([[user2, [message]]]));
}

const saveFiles = (files: any[]) => {
   //const link = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:5000'
   files.forEach(file => {
      //writeFile(`${link}/files/file.png`, file, (error) => console.error('error: ' + error))
   });
}
