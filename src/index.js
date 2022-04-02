import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css'

const cotainer = document.getElementById('root');
const root = createRoot(cotainer);
root.render(<App />);
registerServiceWorker();
