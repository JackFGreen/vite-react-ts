import {useEffect, useRef} from 'react';

export default function useCustomEventListener(
	type: string,
	listener: (e?: CustomEvent) => void,
	options?: boolean | AddEventListenerOptions
): void {
	const handerRef = useRef<unknown>(null);
	useEffect(() => {
		handerRef.current = listener;
	}, [listener]);

	useEffect(() => {
		const fn = (e: Event): void => typeof handerRef.current === 'function' && handerRef.current(e);

		window.addEventListener(type, fn, options);

		return () => {
			window.removeEventListener(type, fn);
		};
	}, [type, options]);
}
