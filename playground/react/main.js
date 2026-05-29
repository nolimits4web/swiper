import React from 'react';
import { createRoot } from 'react-dom/client';

import 'swiper/swiper-bundle.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(App));
