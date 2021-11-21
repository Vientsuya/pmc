import Line from './Line';

const LineContainer = ({ lineCount }) => {
	return (
		<div className="line-container">
			{Array.from({ length: lineCount }, (_, i) => 
				<Line key={i} lineNumber={i} />
			)}
		</div>
	);
};

export default LineContainer;
