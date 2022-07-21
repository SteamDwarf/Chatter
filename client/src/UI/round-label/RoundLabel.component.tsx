import { FC, memo } from "react";
import './RoundLabel.css';

interface IRoundLabel {
    color: string;
    label: string;
}

const RoundLabel:FC<IRoundLabel> = memo(({color, label}) => {
    return (
        <h3 className={`round-label ${color}`}>{label[0]}</h3>
    );
});

export default RoundLabel;