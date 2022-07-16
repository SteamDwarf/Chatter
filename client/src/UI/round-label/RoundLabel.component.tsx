import { FC, memo } from "react";
import classes from './RoundLabel.module.css';

interface IRoundLabel {
    color: string;
    label: string;
}

const RoundLabel:FC<IRoundLabel> = ({color, label}) => {
    return (
        <h3 className={`${classes.roundLabel} ${classes[color]}`}>{label[0]}</h3>
    );
}

export default memo(RoundLabel);