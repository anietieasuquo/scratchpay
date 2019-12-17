import React from 'react';
import {Link} from 'react-router-dom';

import './Error403.scss';

/**
 * Error 403 page.
 * @exports Error403
 */
const Error403 = () => (
    <div className="Error403">
        <div className="Error403__container">
            <div className="Error403__main col-6 col-lg-3 col-sm-4 text-center">
                <h1>403</h1>
                <h5>Forbidden</h5>
                <Link to="/dashboard">RETURN HOME</Link>
            </div>
        </div>
    </div>
);

export default Error403;
