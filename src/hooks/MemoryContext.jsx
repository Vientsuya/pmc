import React, { createContext, useContext, useState } from 'react';
import { getInitialMemory, STACK_SIZE } from '../constants';

const MemoryContext = createContext(undefined);

export const useMemory = () => {
	const context = useContext(MemoryContext);
	if (context === undefined) {
		throw new Error('useMemory must be used within a MemoryProvider');
	}

	return context;
}

// add memoization, gotta split the state, make the Stack seperate
// maybe each line holds its own internal state and then submit to Context for calculations etc?
export const MemoryProvider = ({ children }) => {
	const [memory, setMemory] = useState(getInitialMemory());

	const nextPC = (prevPC) => (prevPC+1) % STACK_SIZE;

	const getValue = (at, val) => {
		switch (at) {
			case '$':
				return Number(val);
			case '@':
				return Number(memory.stack[val]);
			case '&':
				return Number(memory.stack[getValue('@', val)]);
			default:
				throw new Error(`Unhandled instruction "${at}" with value: ${val} !`);
		}
	};

	const handleNULL = (_, __) => {
		setMemory(prev => ({
			...prev,
			PC: nextPC(prev.PC)
		}));
	};

	const handleSTOP = (_, __) => {
		return 0;
	};

	const handleLOAD = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const handleSTORE = (at, val) => {
		setMemory(prev => ({
			...prev,
			stack: prev.stack.map((el, i) =>
				i === getValue(at, val) ? memory.AC : el
			),
			PC: nextPC(prev.PC)
		}));
	};

	const handleJUMP = (at, val) => {
		setMemory(prev => ({
			...prev,
			PC: getValue(at, val),
		}));
	};

	const handleJNEG = (at, val) => {
		if (memory.AC < 0) {
			setMemory(prev => ({
				...prev,
				PC: getValue(at, val),
			}));
			return;
		}
		
		setMemory(prev => ({
			...prev,
			PC: nextPC(prev.PC)
		}));
	};

	const handleJZERO = (at, val) => {
		if (memory.AC === 0) {
			setMemory(prev => ({
				...prev,
				PC: getValue(at, val),
			}));
			return;
		}

		setMemory(prev => ({
			...prev,
			PC: nextPC(prev.PC)
		}));
	};

	const handleADD = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: Number(prev.AC) + getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const handleSUB = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: Number(prev.AC) - getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const handleMULT = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC * getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const handleDIV = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC / getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const handleMOD = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC % getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const handleOR = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC || getValue(at, val) ? true : false,
			PC: nextPC(prev.PC)
		}));
	};

	const handleAND = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: prev.AC && getValue(at, val) ? true : false,
			PC: nextPC(prev.PC)
		}));
	};

	const handleNOT = (at, val) => {
		setMemory(prev => ({
			...prev,
			AC: !getValue(at, val),
			PC: nextPC(prev.PC)
		}));
	};

	const commands = {
		NULL: handleNULL,
		STOP: handleSTOP,
		LOAD: handleLOAD,
		STORE: handleSTORE,
		JUMP: handleJUMP,
		JNEG: handleJNEG,
		JZERO: handleJZERO,
		ADD: handleADD,
		SUB: handleSUB,
		MULT: handleMULT,
		DIV: handleDIV,
		MOD: handleMOD,
		OR: handleOR,
		AND: handleAND,
		NOT: handleNOT,
	};

	const value = { memory, setMemory, commands };

	return (
		<MemoryContext.Provider value={value}>
			{children}
		</MemoryContext.Provider>
	);
};
