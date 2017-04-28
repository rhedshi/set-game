import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes.js';

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
