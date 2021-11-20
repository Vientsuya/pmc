import { useMemory } from '../hooks/MemoryContext';

const RegisterValues = () => {
	const { memory } = useMemory();
	return (
		<div className="register-values">
			<span>AC: {memory.AC}</span>
			<span>PC: {memory.PC}</span>
		</div>
	);
};

export default RegisterValues;
