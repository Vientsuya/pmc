import { useContext } from 'react';
import { MemoryContext } from '../hooks/MemoryContext';

const RegisterValues = () => {
	const { memory } = useContext(MemoryContext);
	return (
		<div className="register-values">
			<span>AC: {memory.AC}</span>
			<span>PC: {memory.PC}</span>
		</div>
	);
};

export default RegisterValues;
