import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryProvider } from './hooks/MemoryContext';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<MemoryProvider>
			<App />
		</MemoryProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
