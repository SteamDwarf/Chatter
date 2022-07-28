import { FC, memo } from "react";
import './sign-in-form__message.style.css';

interface IFormMessageProps {
    isLoading: boolean;
    error: string;
}

const FormMessage:FC<IFormMessageProps> = memo(({isLoading, error}) => {
    if(isLoading) {
        return <h4 className="sign-in-form__message loading-message">Подождите...</h4>
    }

    if(error) {
        return <h4 className="sign-in-form__message error-message">{error}</h4>
    }

    return <div className="sign-in-form__message"></div>;
});

export default FormMessage;