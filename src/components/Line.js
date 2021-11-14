import { useContext } from 'react';
import { MemoryContext } from '../hooks/MemoryContext';

const Line = ({ lineNum }) => {
	const { memory, setMemory } = useContext(MemoryContext);

	const handleChange = e => {
		return 0;
	};

	const lineCountClass =
		lineNum == memory.PC && memory.programRunning
			? 'current-line-num'
			: 'line-count-num';
	const inputClass =
		lineNum == memory.PC && memory.programRunning ? 'current-line-input' : '';

	return (
		<div className="line">
			<div className={lineCountClass}>{lineNum}.</div>
			<input
				className={inputClass}
				type="text"
				onBlur={handleChange}
				disabled={memory.programRunning}
			></input>
		</div>
	);
};

export default Line;
