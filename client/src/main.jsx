import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './contexts/AuthProvider';
import MyGlobalStyles from './styles/globalStyles';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <MyGlobalStyles />
            <App />
        </AuthProvider>
    </React.StrictMode>
);