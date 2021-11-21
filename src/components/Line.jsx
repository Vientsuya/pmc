import { useState } from 'react';
import { useMemory } from '../hooks/MemoryContext';

const validateLine = (value) => {
	if(value === '') return '';
	if(!RegExp(/[\w]+ [$@&]+ \d+/).test(value)) return 'Invalid Format';
	// add some more cases

	// try to split args for commands format and validate them seperately here

	return '';
};

const Line = ({ lineNumber }) => {
	const { memory, setMemory } = useMemory();
	const [error, setError] = useState("");
	const [focused, setFocused] = useState(false);

	const updateStack = (event) => {
		const newValue = event.target.value;

		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((prevValue, i) => i === lineNumber ? newValue : prevValue)
		}));
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = (event) => {
		setFocused(false);
		setError(validateLine(event.target.value.trim().toUpperCase()));
	};

	const isCurrentRunningLine = (lineNumber === memory.PC) && memory.programRunning;

	const lineCountClass = isCurrentRunningLine ? 'current-line-num' : 'line-count-num';
	const inputClass = isCurrentRunningLine ? 'current-line-input' : '';

	return (
		<div className="line">
			<div className={`${lineCountClass} ${focused ? 'focused-line' : ''}`}>
				{lineNumber}.
			</div>
			<input
				className={`${inputClass} ${error ? 'input-error' : ''}`}
				type="text"
				onFocus={handleFocus}
				onBlur={handleBlur}
				disabled={memory.programRunning}
				value={memory.stack[lineNumber]}
				onChange={updateStack}
			></input>
		</div>
	);
};

export default Line;
