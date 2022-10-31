import React from 'react';
import { Button } from '@blueprintjs/core';
import './CopyField.css';

const CopyField = ({
    id,
    fill = false,
    text
}) => {
    return (
        <div className='copy-field-container'>
            <Button
                id={id}
                fill={fill}
                className='copy-field'
                rightIcon='clipboard'
                text={text}
            />
        </div>
    )
}

export default CopyField;