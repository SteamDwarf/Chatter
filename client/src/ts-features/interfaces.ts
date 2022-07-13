export interface Message {
    content: string;
}

export interface MessageFrom extends Message {
    from: string;
}

export interface MessageTo extends Message {
    to: string;
}