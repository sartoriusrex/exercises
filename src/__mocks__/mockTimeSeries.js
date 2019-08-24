export const setData = jest.fn();

const setTimeSeriesDataMock = jest.fn().mockImplementation( () => {
	return(
		{ setTimeSeriesData: setData }
	)
});

export default setTimeSeriesDataMock;