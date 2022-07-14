export interface Message {
    content: string;
    date: string | number;
    from: string;
    to: string;
}

export interface MessageFrom extends Message {
    from: string;
}

export interface MessageTo extends Message {
    to: string;
}