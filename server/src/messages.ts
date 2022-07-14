const messages = [
    {from: 'Vasya',
     messages: [
        {to: 'Petya', content: 'hello'},
        {to: 'Dima', content: 'bye'}
     ]},
    {from: 'Petya',
     messages: [
        {to: 'Vasya', content: 'hello'},
        {to: 'Dima', content: 'bye'}
     ]},
];

export const getMessages = () => {
    return messages;
}

export const getUserMessage = (userId: string) => {
    
}

