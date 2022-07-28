import { FC, memo } from "react";
import './rounded-label.style.css';

interface IRoundedLabel {
    color: string;
    label: string;
}

const RoundedLabel:FC<IRoundedLabel> = memo(({color, label}) => {
    return (
        <h3 className={`rounded-label ${color}`}>{label[0]}</h3>
    );
});

export default RoundedLabel;