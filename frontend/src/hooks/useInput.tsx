import React, { useState } from "react";

export default function useInput<T>(
	initialValue: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] {
	const [input, setInput] = useState(initialValue);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value as T);
	};

	return [input, onChangeHandler];
}
