import Editor from './components/Editor';
import { MemoryContext } from './hooks/MemoryContext';
import { useContext } from 'react';
import './index.css';

const App = () => {
	const { memory, setMemory } = useContext(MemoryContext);

	const getValue = (at, val) => {
		switch (at) {
			case '$':
				return Number(val);
			case '@':
				return Number(memory.stack[val]);
			case '&':
				return Number(memory.stack[getValue('@', val)]);
		}
	};

	const handleNULL = (_, __) => {
		setMemory(prev => {
			return { ...prev, PC: prev.PC + 1 };
		});
	};

	const handleSTOP = (_, __) => {
		return 0;
	};

	const handleLOAD = (at, val) => {
		setMemory(prev => {
			return {
				...prev,
				AC: getValue(at, val),
				PC: prev.PC + 1,
			};
		});
	};

	const handleSTORE = (at, val) => {
		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((el, i) =>
				i == getValue(at, val) ? memory.AC : el
			),
			PC: prev.PC + 1,
		}));
	};

	const handleJUMP = (at, val) => {
		setMemory(prev => ({
			...prev,
			PC: getValue(at, val),
		}));
	};

	const handleJNEG = (at, val) => {
		if (memory.AC < 0) {
			setMemory(prev => ({
				...prev,
				PC: getValue(at, val),
			}));
		} else {
			setMemory(prev => {
				return { ...prev, PC: prev.PC + 1 };
			});
		}
	};

	const handleJZERO = (at, val) => {
		if (memory.AC == 0) {
			setMemory(prev => ({
				...prev,
				PC: getValue(at, val),
			}));
		} else {
			setMemory(prev => {
				return { ...prev, PC: prev.PC + 1 };
			});
		}
	};

	const handleADD = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: Number(prev.AC) + getValue(at, val),
			PC: prev.PC + 1,
		}));
	};

	const handleSUB = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: Number(prev.AC) - getValue(at, val),
			PC: prev.PC + 1,
		}));
	};

	const handleMULT = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC * getValue(at, val),
			PC: prev.PC + 1,
		}));
	};

	const handleDIV = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC / getValue(at, val),
			PC: prev.PC + 1,
		}));
	};

	const handleMOD = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC % getValue(at, val),
			PC: prev.PC + 1,
		}));
	};

	const handleOR = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC || getValue(at, val) ? true : false,
			PC: prev.PC + 1,
		}));
	};

	const handleAND = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC && getValue(at, val) ? true : false,
			PC: prev.PC + 1,
		}));
	};

	const handleNOT = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: !getValue(at, val),
			PC: prev.PC + 1,
		}));
	};

	const commands = {
		NULL: handleNULL,
		STOP: handleSTOP,
		LOAD: handleLOAD,
		STORE: handleSTORE,
		JUMP: handleJUMP,
		JNEG: handleJNEG,
		JZERO: handleJZERO,
		ADD: handleADD,
		SUB: handleSUB,
		MULT: handleMULT,
		DIV: handleDIV,
		MOD: handleMOD,
		OR: handleOR,
		AND: handleAND,
		NOT: handleNOT,
	};

	const doOperation = operation => {
		const [command, addressType, value] = operation.split(' ');
		return commands[command](addressType, value);
	};

	const resetMemory = () => {
		setMemory(prev => ({
			stack: Array(31).fill(0),
			programRunning: false,
			AC: 0,
			PC: 0,
		}));
	};

	const runCode = () => {
		resetMemory();
		setMemory(prev => ({
			...prev,
			programRunning: true,
		}));

		const inputList = document.querySelectorAll('.line > input');

		for (let i = 0; i < inputList.length; i++) {
			if (inputList[i].value == '' || !isNaN(inputList[i].value)) {
				setMemory(prev => ({
					...prev,
					PC: prev.PC + 1,
				}));
				continue;
			} else {
				try {
					doOperation(inputList[i].value);
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
			<button
				className="run-program"
				disabled={memory.programRunning}
				onClick={runCode}
			>
				SIEMA
			</button>
		</div>
	);
};

export default App;
