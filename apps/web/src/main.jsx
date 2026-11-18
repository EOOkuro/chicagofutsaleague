import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { LangProvider } from '@/lib/i18n.jsx';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<LangProvider>
		<App />
	</LangProvider>
);