import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import './CopyField.css';
import { Tooltip2 } from '@blueprintjs/popover2';

const CopyField = ({
    id,
    fill = false,
    text
}) => {

    const [copyLabel, setCopyLabel] = useState('Copy');
    const onCopy = () => {
        navigator.clipboard.writeText(text).then(function() {
            setCopyLabel('✔ Copied');
            setTimeout(() => setCopyLabel('Copy'), 5000);
        });
    }

    return (
        <div className='copy-field-container'>
            <Tooltip2
                content={copyLabel}
                placement='top-end'
            >
                <Button
                    id={id}
                    fill={fill}
                    className='copy-field'
                    rightIcon='clipboard'
                    text={text}
                    onClick={onCopy}
                />
            </Tooltip2>
        </div>
    )
}

export default CopyField;