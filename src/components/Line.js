import { useContext, useState } from 'react';
import { MemoryContext } from '../hooks/MemoryContext';

const Line = ({ lineNum }) => {
	const { memory, setMemory } = useContext(MemoryContext);
	const [focused, setFocused] = useState(false);

	const lineCountClass =
		lineNum == memory.PC && memory.programRunning
			? 'current-line-num'
			: 'line-count-num';
	const inputClass =
		lineNum == memory.PC && memory.programRunning ? 'current-line-input' : '';

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
			></input>
		</div>
	);
};

export default Line;
