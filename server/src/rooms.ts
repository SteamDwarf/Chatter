/* 

export interface IRoom {
    id: string;
    name: string;
    messages: IMessage[];
}

const rooms = new Map();

export const createRoom = (roomID: string, roomData: IRoom) => {
    return rooms.set(roomID, roomData);
}

export const getRoom = (roomID: string) => {
    return rooms.get(roomID);
}

export const getAllRooms = () => {
    return rooms;
} */