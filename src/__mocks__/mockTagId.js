export const setTagId = jest.fn();

const setTagIdMock = jest.fn().mockImplementation( () => {
	return(
		{ setTagId: setTagId }
	)
});

export default setTagIdMock;