export const mockSetStartTS = jest.fn();

const setStartMock = jest.fn().mockImplementation( () => {
	return(
		{ setStartTime: mockSetStartTS }
	)
});

export default setStartMock;
