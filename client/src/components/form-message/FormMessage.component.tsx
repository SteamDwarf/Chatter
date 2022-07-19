import { FC } from "react";
import './FormMessage.css';

interface IFormMessageProps {
    isLoading: boolean;
    error: string;
}

const FormMessage:FC<IFormMessageProps> = ({isLoading, error}) => {
    if(isLoading) {
        return <h4 className="form-message loading-message">Подождите...</h4>
    }

    if(error) {
        return <h4 className="form-message error-message">{error}</h4>
    }

    return <div className="form-message"></div>;
}

export default FormMessage;