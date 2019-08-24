import axios from 'axios';

export const fetchData = (
	e,
	setError,
	setLoading,
	setTimeSeriesData,
	startTS,
	endTS,
	tagId
) => {
	e.preventDefault();

	// Validate start and end TS
	if( startTS >= endTS ){
		return setError("Correct Date Range: start must be before end");
	}

	// Validate that user has selected Tag to analyze
	if( tagId === null ){
		return setError("Please select a Tag");
	}

	setError(null); //At this point, no known errors have occurred on the input side - set errors to null
	setLoading(true); //we begin loading data with axios - set loading true
	
	axios.get(
		`http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/${tagId}?startTS=${startTS}&endTS=${endTS}`
	).then( res => {
		setTimeSeriesData( res.data ); //with our response, we update our time series data with the data, then set loading to false
		setLoading(false);
	}).catch( err => {
		console.log( err );
		setError("Something went wrong with the search."); //if there's an error, most likely it's in the inputs to the search params. cannot know for sure unless we log the error. Also set loading to false if we return an error.
		setLoading(false);
	});
};