import Editor from './components/Editor';
import { getInitialMemory } from './constants';
import { useMemory } from './hooks/MemoryContext';
import './index.css';


// LOAD $ 20 // ładuje 20 do AC
// ADD $ 10 // dodaje 10
// STORE $ 14 // storuje to co jest w AC w Memory[14]
// for testing purposes
console.log('LOAD $ 20', 'ADD $ 10', 'STORE $ 14')

const App = () => {
	const { memory, setMemory, commands } = useMemory();

	
	const doOperation = operation => {
		if (operation === '' || !isNaN(operation)) return;

		//gotta make it safer, validation on line level
		const [command, addressType, value] = operation.toUpperCase().trim().split(' ');

		if(!(command in commands)) throw new Error(`Unknown command "${command}"`);

		return commands[command](addressType, value);
	};

	const resetMemory = () => {
		setMemory(getInitialMemory());
	};

	// const resetErrors = inputList => {
	// 	for (let i = 0; i < inputList.length; i++) {
	// 		inputList[i].classList.remove('input-error');
	// 	}
	// };

	const loadMemory = () => {
		// resetErrors(inputList);
		setMemory(prev => ({
			...prev,
			programRunning: true,
		}));
	};

	const runCode = () => {
		for (let i = 0; i < memory.stack.length; i++) {
			if (memory.stack[i] === '' || !isNaN(memory.stack[i])) {
				setMemory(prev => ({
					...prev,
					PC: prev.PC + 1,
				}));
				continue;
			} 

			try {
				doOperation(memory.stack[memory.PC]);
			} catch {
				// inputList[i].classList.add('input-error');
				resetMemory();
				return;
			}
		}

		setMemory(prev => ({
			...prev,
			programRunning: false,
		}));
	};

	return (
		<div className="main-container">
			<Editor />
			<div className="button-box">
				<button
					className="run-program"
					disabled={memory.programRunning}
					onClick={loadMemory}
				>
					ZAŁADUJ DO PAMIĘCI
				</button>
				<button
					disabled={!memory.programRunning}
					onClick={() => doOperation(memory.stack[memory.PC])}
				>
					WYKONAJ INSTRUKCJE
				</button>
				<button disabled={!memory.programRunning} onClick={runCode}>
					WYKONAJ CAŁY PROGRAM
				</button>
			</div>
		</div>
	);
};

export default App;
