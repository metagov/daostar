import React from 'react';
import validator from 'validator';
import { Button, FormGroup, Icon, InputGroup } from '@blueprintjs/core';
import './FieldWithViewLink.css';

const FieldWithViewLink = ({
    label,
    id,
    value,
    placeholder,
    onChange
}) => {

    const isLink = validator.isURL(value);

    return (
        <FormGroup
            label={label}
            labelFor={id}
            className='field-with-view-link'
        >
            <a 
                href={value} 
                target='_blank'
                className={isLink ? 'view-link' : 'view-link hidden'}
            > 
                <Icon size={10} icon='document-open' />View
            </a>
            <InputGroup 
                value={value} 
                id={id}
                placeholder={placeholder}
                onChange={onChange}
            />
        </FormGroup>
    )
}

export default FieldWithViewLink;