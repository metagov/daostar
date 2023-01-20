import { Icon } from '@blueprintjs/core';
import React from 'react';

const URILink = ({
    uri
}) => {
    return uri ? (
        <a href={uri} target="_blank" className='no-underline'>
            URI
            <Icon icon='share' size={10} />
        </a> 
    ) : (
        <span>Not provided</span>
    )
}

export default URILink;