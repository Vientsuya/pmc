import { useState } from 'react';
import { useMemory } from '../hooks/MemoryContext';

const Line = ({ lineNum }) => {
	const { memory, setMemory } = useMemory();
	const [focused, setFocused] = useState(false);

	const updateStack = (event) => {
		const newValue = event.target.value;

		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((prevValue, i) => i === lineNum ? newValue : prevValue)
		}));
	};

	const isCurrentRunningLine = (lineNum === memory.PC) && memory.programRunning

	const lineCountClass = isCurrentRunningLine ? 'current-line-num' : 'line-count-num';
	const inputClass = isCurrentRunningLine ? 'current-line-input' : '';

	return (
		<div className="line">
			<div className={`${lineCountClass} ${focused ? 'focused-line' : ''}`}>
				{lineNum}.
			</div>
			<input
				className={inputClass}
				type="text"
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				disabled={memory.programRunning}
				value={memory.stack[lineNum]}
				onChange={updateStack}
			></input>
		</div>
	);
};

export default Line;
