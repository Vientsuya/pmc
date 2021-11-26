export const DEFAULT_LINES_NUMBER = 21;

const INITIAL_MEMORY = {
	lineNum: DEFAULT_LINES_NUMBER,
	stack: Array(DEFAULT_LINES_NUMBER).fill(''),
	programRunning: false,
	AC: 0,
	PC: 0,
};

export const getInitialMemory = () => Object.assign({}, INITIAL_MEMORY);

export const keyWordSuggestions = [
	'LOAD',
	'STORE',
	'ADD',
	'SUB',
	'MULT',
	'DIV',
	'MOD',
];
