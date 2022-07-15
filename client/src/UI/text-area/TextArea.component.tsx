import { ChangeEvent, FC, KeyboardEvent } from "react";
import classes from './TextArea.module.css';

interface ITextAreaProps {
    className?: string;
    placeholder?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    color?: 'main';
    size?: 'small' | 'medium' | 'large';
    width?: '' | 'full' | 'half';
    rounded?: '' | 'low-smooth' | 'medium-smooth' | 'strong-smooth';
}

const TextArea:FC<ITextAreaProps> = ({
    className,
    placeholder, 
    value,
    onChange, 
    onKeyDown, 
    color = 'main',
    size = 'medium',
    width = '',
    rounded = ''
}) => {
    const classNames = `${classes.textarea} ${className} ${classes[color]} ${classes[size]} ${classes[width]} ${classes[rounded]}`;

    return (
        <div className={classes.textareaContainer}>
            <textarea 
                className={classNames}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}

export default TextArea;