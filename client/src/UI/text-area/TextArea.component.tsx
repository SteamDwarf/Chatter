import { FC, TextareaHTMLAttributes, useLayoutEffect, useRef } from "react";
import classes from './TextArea.module.css';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const countMinSize = () => {
        if(size === 'small') return 47;
        if(size === 'medium') return 49;
        return 53;
    };

    useLayoutEffect(() => {
        if(textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            console.log(textareaRef.current.scrollHeight);
            textareaRef.current.style.height = `${Math.max(countMinSize(), textareaRef.current.scrollHeight)}px`
        }

    }, [value]);

    return (
        <div className={classes.textareaContainer}>
            <textarea
                ref={textareaRef}
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