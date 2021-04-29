import {debounce} from 'lodash';

type UseDebounce = typeof debounce;

const useDebounce: UseDebounce = (func, wait = 500, options?) => {
	const debounceFn = debounce(func, wait, options);
	return debounceFn;
};

export default useDebounce;
