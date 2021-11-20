import Line from './Line';
import { useEffect, useContext } from 'react';
import { MemoryContext } from '../hooks/MemoryContext';

const LineContainer = ({ lineCount }) => {
	const { memory } = useContext(MemoryContext);

	useEffect(() => {
		const inputList = document.querySelectorAll('.line > input');
		for (let i = 0; i < inputList.length; i++) {
			if (!isNaN(memory.stack[i])) {
				inputList[i].value = memory.stack[i];
			}
		}
	}, [memory.stack]);

	return (
		<div className="line-container">
			{Array.from({ length: lineCount }, (_, i) => 
				<Line key={i} lineNum={i} />
			)}
		</div>
	);
};

export default LineContainer;
