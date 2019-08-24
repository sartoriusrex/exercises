export const setTag = jest.fn();

const setTagMock = jest.fn().mockImplementation( () => {
	return(
		{ setTag: setTag }
	)
});

export default setTagMock;