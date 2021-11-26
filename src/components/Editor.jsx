import RegisterValues from './RegisterValues';
import Line from './Line';

const Editor = ({ lineCount, addLine }) => {
	return (
		<div className="editor">
			<RegisterValues />
			<div className="line-container">
				{Array.from({ length: lineCount }, (_, i) => (
					<Line key={i} lineNumber={i} />
				))}
				<div className="add-line" onClick={() => addLine()}>
					Dodaj Linię
				</div>
			</div>
		</div>
	);
};

export default Editor;
