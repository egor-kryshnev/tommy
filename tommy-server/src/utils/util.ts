import Axios from "axios";

export const trycatch = async (func: Function, ...args: any[]) => {
    const ret: { result?: any, err?: any } = {};

    try {
        ret.result = await func(...args);
    } catch (err) {
        ret.err = err;
    }

    return ret;
};

const couldThrow = async (throws: boolean = false) => {
    if (throws) {
        throw new Error('Failed');
    }

    return 'success';
};

const example = async () => {
    const { result, err } = await trycatch(() => couldThrow);
    if (err) {
        console.error(`Request failed with error ${err.toString()}`);
        return;
    }

    console.log(`Result is good: ${result}`);
};

