import Editor from './components/Editor';
import { getInitialMemory } from './constants';
import { useMemory } from './hooks/MemoryContext';
import './index.css';

const splitOperation = operation => {
	//extract the logic here
	const [command, addressType, value] = operation.trim().split(' ');

	console.log({ command, addressType, value });

	return { command, addressType, value };
};

const App = () => {
	const { memory, setMemory, commands } = useMemory();

	const resetMemory = () => {
		setMemory(getInitialMemory());
	};

	const loadMemory = () => {
		console.log(memory);
		setMemory(prev => ({
			...prev,
			programRunning: true,
		}));
	};

	const performOperation = operation => {
		console.log(`[${memory.PC}]: `, { operation });
		if (!operation || !isNaN(operation)) {
			return commands.NULL(null, null);
		}

		const { command, addressType, value } = splitOperation(operation);

		if (!(command in commands)) throw new Error(`Unknown command "${command}"`);
		return commands[command.toUpperCase()](addressType, value);
	};

	const runCode = () => {
		// const operation = memory.stack[memory.PC];
		memory.stack.forEach(operation => {
			performOperation(operation);
		});

		setMemory(prev => ({
			...prev,
			programRunning: false,
		}));
	};

	const isDisabledLoadMemory = memory.programRunning; // || memory.stack.some(line => line.error);
	const isDisabledPerformOperation = !memory.programRunning;
	const isDisabledRunCode = !memory.programRunning || memory.PC !== 0;

	return (
		<div className="main-container">
			<Editor />
			<div className="button-box">
				<select className="line-number-select">
					{/* the values are for some reason a bit too much to the right*/}
					<option value="20">20</option>
					<option value="25">25</option>
					<option value="30">30</option>
					<option value="40">40</option>
				</select>
				<button
					className="run-program"
					disabled={isDisabledLoadMemory}
					onClick={loadMemory}
				>
					ZAŁADUJ DO PAMIĘCI
				</button>
				<button
					disabled={isDisabledPerformOperation}
					onClick={() => performOperation(memory.stack[memory.PC])}
				>
					WYKONAJ INSTRUKCJE
				</button>
				<button disabled={isDisabledRunCode} onClick={runCode}>
					WYKONAJ CAŁY PROGRAM
				</button>
				<button onClick={resetMemory}>RESET</button>
			</div>
		</div>
	);
};

export default App;
