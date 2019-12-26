import React from 'react';

import './Loader.scss';

/**
 * Loader component
 * @exports Loader
 */
const Loader = props => (
    props.loading ?
        <div className="Loader">
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> : <div />
);

export default Loader;
