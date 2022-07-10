import io from 'socket.io-client';

export const ioConnect = () => {
    io('http://localhost:5000');
}