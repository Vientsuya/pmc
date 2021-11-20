import { useContext, useState } from 'react';
import { MemoryContext } from '../hooks/MemoryContext';

const Line = ({ lineNum }) => {
	const { memory } = useContext(MemoryContext);
	const [focused, setFocused] = useState(false);

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
			></input>
		</div>
	);
};

export default Line;
