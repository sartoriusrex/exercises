import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, waitForElement } from '@testing-library/react';
import Form from './Form';
import mockTag from './__mocks__/mockTag';
import mockTagId from './__mocks__/mockTagId';
import mockTimeSeries from './__mocks__/mockTimeSeries';
import axiosMock from 'axios';

describe('Form', () => {
	afterEach( cleanup );

	test('it renders the DateInput with start props', async () => {
		const initialTags = [{ 
			label: "Power",
			tagId: "Tag1",
			observationTS: "August 15, 2019",
			value: .999,
			features: [
				'power',
				'meter'
			]
		}];

		axiosMock.get.mockResolvedValueOnce({
			data: initialTags
		});

		const tagId = "Tag1"

		const { getByTestId } = render(
			<Form
				setTimeSeriesData={ mockTimeSeries }
				tags={ initialTags }
				setTags={ mockTag } //cannot mock the useState functionality for setting state, so just pass object as if state were being set;
				tagId={ tagId }
				setTagId={ mockTagId }
			/>
		);

		expect( axiosMock.get ).toHaveBeenCalledTimes( 1 );
		expect( getByTestId('tag') ).toHaveTextContent("Power");
		// mockAxios is being called and can be effectively tested in Form, but setTags and the other state setters are more difficult to test, as they are being passed down from App, which at the moment cannot render the canvas element
	});
});