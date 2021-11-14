import Editor from './components/Editor';
import { MemoryProvider } from './hooks/MemoryContext';
import './index.css';

const App = () => {
	return (
		<div className="main-container">
			<MemoryProvider>
				<Editor />
			</MemoryProvider>
		</div>
	);
};

export default App;
