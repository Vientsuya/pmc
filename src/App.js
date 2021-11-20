import Editor from './components/Editor';
import { MemoryContext } from './hooks/MemoryContext';
import { useContext } from 'react';
import './index.css';

const App = () => {
	const { memory, setMemory, commands } = useContext(MemoryContext);



	const doOperation = operation => {
		operation = operation.toUpperCase();
		const [command, addressType, value] = operation.split(' ');
		return commands[command](addressType, value);
	};

	const resetMemory = () => {
		setMemory(prev => ({
			stack: Array(21).fill(''),
			programRunning: false,
			AC: 0,
			PC: 0,
		}));
	};

	const resetErrors = inputList => {
		for (let i = 0; i < inputList.length; i++) {
			inputList[i].classList.remove('input-error');
		}
	};

	const loadMemory = () => {
		const inputList = document.querySelectorAll('.line > input');
		resetErrors(inputList);
		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((el, i) => inputList[i].value),
			programRunning: true,
		}));
	};

	const runCode = () => {
		const inputList = document.querySelectorAll('.line > input');

		for (let i = 0; i < memory.stack.length; i++) {
			if (memory.stack[i] == '' || !isNaN(memory.stack[i])) {
				setMemory(prev => ({
					...prev,
					PC: prev.PC + 1,
				}));
				continue;
			} else {
				try {
					doOperation(memory.stack[memory.PC]);
				} catch {
					inputList[i].classList.add('input-error');
					resetMemory();
					return 0;
				}
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
