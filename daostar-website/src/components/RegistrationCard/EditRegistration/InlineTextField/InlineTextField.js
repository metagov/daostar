import React, { Fragment, useState } from 'react';
import { Callout, FormGroup, Icon, InputGroup } from '@blueprintjs/core';
import './InlineTextField.css';

const InlineTextField = ({
    label,
    id,
    value,
    warning,
    onChange
}) => {

    const [isExpanded, toggleExpanded] = useState(false);
    const onExpand = () => toggleExpanded(true);

    if (isExpanded) {
        return (
            <div className='inline-text-field-expanded'>
                <FormGroup
                    label={label}
                    labelFor={id}
                >
                    <InputGroup
                        id={id}
                        value={value}
                        onChange={onChange}
                    />
                </FormGroup>
                <Callout intent='warning'>
                    {warning}
                </Callout>
            </div>

        )
    }

    return (
        <p className='bp4-text-small wizard-no-margin'>
            <span className='bp4-text-muted'>{label}: </span>
            <span 
                className='card-metadata-value inline-text-field-value'
                onClick={onExpand}
            >
                {value ? value : 'None provided'} <Icon icon='edit' size={11} />
            </span>
        </p>
    )
}

export default InlineTextField;