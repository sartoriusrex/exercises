import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Message from './Message';

test('Loads Message and displays loading', () => {
	const { getByText } = render(
		<Message error={null} loading={true} />
	)

	let loading = getByText("Loading Data...");

	expect( loading ).toBeInTheDocument();
});

test('Loads Message and displays error', () => {
	const { getByText } = render(
		<Message error={'error'} loading={false} />
	)

	let error = getByText("error");

	expect ( error ).toBeInTheDocument();
});

test('Loads Message and displays nothing', () => {
	const { queryByText } = render(
		<Message error={null} loading={false} />
	)

	let error = queryByText("error");
	let loading = queryByText("Loading Data...");

	expect ( loading ).toBeNull();
	expect ( error ).toBeNull();
});