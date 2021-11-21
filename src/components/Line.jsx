import { useState } from 'react';
import { useMemory } from '../hooks/MemoryContext';

const validateLine = (value) => {
	if(!RegExp(/[\w]+ [$@&]+ \d+/).test(value)) return "Invalid Format";
	// add some more cases

	return "";
};

const Line = ({ lineNum }) => {
	const { memory, setMemory } = useMemory();
	const [error, setError] = useState("");
	const [focused, setFocused] = useState(false);

	const updateStack = (event) => {
		const newValue = event.target.value;

		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((prevValue, i) => i === lineNum ? newValue : prevValue)
		}));
	};

	const handleBlur = (event) => {
		setFocused(false);
		if(event.target.value === "") return;

		setError(validateLine(event.target.value));
	};

	const isCurrentRunningLine = (lineNum === memory.PC) && memory.programRunning;

	const lineCountClass = isCurrentRunningLine ? 'current-line-num' : 'line-count-num';
	const inputClass = isCurrentRunningLine ? 'current-line-input' : '';

	return (
		<div className="line">
			<div className={`${lineCountClass} ${focused ? 'focused-line' : ''}`}>
				{lineNum}.
			</div>
			<input
				className={`${inputClass} ${error ? 'input-error' : ''}`}
				type="text"
				onFocus={() => setFocused(true)}
				onBlur={handleBlur}
				disabled={memory.programRunning}
				value={memory.stack[lineNum]}
				onChange={updateStack}
			></input>
		</div>
	);
};

export default Line;
