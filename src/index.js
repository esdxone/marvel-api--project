import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/app/app';
import './styles/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);