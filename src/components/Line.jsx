import { useState } from 'react';
import { useMemory } from '../hooks/MemoryContext';
import { keyWordSuggestions } from '../constants';

const validateLine = value => {
	if (value === '') return '';
	if (!RegExp(/[\w]+ [$@&]+ \d+/).test(value)) return 'Invalid Format';
	// add some more cases

	// try to split args for commands format and validate them seperately here

	return '';
};

const Line = ({ lineNumber }) => {
	const { memory, setMemory } = useMemory();
	const [error, setError] = useState('');
	const [focused, setFocused] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	const updateStack = event => {
		const newValue = event.target.value.toUpperCase();

		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((prevValue, i) =>
				i === lineNumber ? newValue : prevValue
			),
		}));
	};

	const suggestKeyword = event => {
		const value = event.target.value;
		let suggestions = [];
		if (value.length > 0) {
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = keyWordSuggestions.sort().filter(v => regex.test(v));
		}
		setSuggestions(suggestions);
	};

	const suggestionSelected = value => {
		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((el, i) => (lineNumber === i ? value : el)),
		}));
		setSuggestions([]);
	};

	const renderSuggestions = () => {
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<ul>
				{suggestions.map((item, i) => (
					<li
						className="suggestion"
						key={i}
						onClick={() => suggestionSelected(item)}
					>
						{item}
					</li>
				))}
			</ul>
		);
	};

	const handleChange = event => {
		updateStack(event);
		suggestKeyword(event);
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = event => {
		setFocused(false);
		setError(validateLine(event.target.value));
	};

	const isCurrentRunningLine =
		lineNumber === memory.PC && memory.programRunning;

	const lineCountClass = isCurrentRunningLine
		? 'current-line-num'
		: 'line-count-num';
	const inputClass = isCurrentRunningLine ? 'current-line-input' : '';

	return (
		<div className="line">
			<div className={`${lineCountClass} ${focused ? 'focused-line' : ''}`}>
				{lineNumber}.
			</div>
			<div className="auto-complete-text-box">
				<input
					className={`${inputClass} ${error ? 'input-error' : ''}`}
					type="text"
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={memory.programRunning}
					value={memory.stack[lineNumber]}
					onChange={handleChange}
				/>
				<div className="suggestion-box">{renderSuggestions()}</div>
			</div>
		</div>
	);
};

export default Line;
