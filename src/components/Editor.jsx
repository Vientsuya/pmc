import LineContainer from './LineContainer';
import RegisterValues from './RegisterValues';
import { useState } from 'react';
import { STACK_SIZE } from '../constants';

const Editor = () => {
	const [lineCount] = useState(STACK_SIZE);

	return (
		<div className="editor">
			<RegisterValues />
			<LineContainer lineCount={lineCount} />
		</div>
	);
};

export default Editor;
