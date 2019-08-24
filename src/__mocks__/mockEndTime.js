export const mockSetEndTS = jest.fn();

const setEndMock = jest.fn().mockImplementation( () => {
	return(
		{ setEndTS: mockSetEndTS }
	)
});

export default setEndMock;