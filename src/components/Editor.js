import LineContainer from './LineContainer';
import RegisterValues from './RegisterValues';
import { useState } from 'react';

const Editor = () => {
	const [lineCount] = useState(21);

	return (
		<div className="editor">
			<RegisterValues />
			<LineContainer lineCount={lineCount} />
		</div>
	);
};

export default Editor;
