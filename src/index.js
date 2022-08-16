import {createRoot} from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './store';
import './styles/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
            <App/>
            </Provider>

);