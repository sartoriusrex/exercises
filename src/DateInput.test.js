import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import DateInput from './DateInput';
import setStartMock from './__mocks__/mockStartTime';
import setEndMock from './__mocks__/mockEndTime';

// Case: startTS
describe('DateInput with startTS', () => {
	test('it renders the DateInput with start props', () => {
		const { getByLabelText, getByDisplayValue } = render(
			<DateInput 
				timeStamp="2019-08-15"
				label="Start"
				setFunction={ setStartMock }
			/>
		)
	
		let label = getByLabelText("Start");
		let value = getByDisplayValue("2019-08-15");
	
		expect( label ).toBeInTheDocument();
		expect( value ).toBeInTheDocument();
	});
	
	test('it fires the function when changed', () => {
		const { getByDisplayValue } = render(
			<DateInput 
				timeStamp="2019-08-15"
				label="Start"
				setFunction={ setStartMock }
			/>
		);
	
		setStartMock({
			data: {
				done: true
			}
		});
	
		fireEvent.change( getByDisplayValue("2019-08-15") );
	
		expect( getByDisplayValue("2019-08-15")).toBeInTheDocument();
		expect( setStartMock ).toHaveBeenCalled();
	});
});

// Case: endTS
describe('DateInput with endTS', () => {
	test('it renders the DateInput with end props', () => {
		const { getByLabelText, getByDisplayValue } = render(
			<DateInput 
				timeStamp="2019-09-30"
				label="End"
				setFunction={ setEndMock }
			/>
		)
	
		let label = getByLabelText("End");
		let value = getByDisplayValue("2019-09-30");
	
		expect( label ).toBeInTheDocument();
		expect( value ).toBeInTheDocument();
	});
	
	test('it fires the function when changed', () => {
		const { getByDisplayValue } = render(
			<DateInput 
				timeStamp="2019-09-30"
				label="End"
				setFunction={ setEndMock }
			/>
		);
	
		setEndMock({
			data: {
				done: true
			}
		});
	
		fireEvent.change( getByDisplayValue("2019-09-30") );
	
		expect( getByDisplayValue("2019-09-30")).toBeInTheDocument();
		expect( setEndMock ).toHaveBeenCalled();
	});
});