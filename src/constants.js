export const STACK_SIZE = 21;

const INITIAL_MEMORY = {
    stack: Array(STACK_SIZE).fill(''),
    programRunning: false,
    AC: 0,
    PC: 0,
};

export const getInitialMemory = () => Object.assign({}, INITIAL_MEMORY);
