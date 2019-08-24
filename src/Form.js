import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Form.css';

const Form = ({ 
	setTimeSeriesData, 
	tags, 
	setTags, 
	tagId, 
	setTagId, 
	startTS, 
	setStartTS, 
	endTS, 
	setEndTS }) => {
	const [ filteredFeatures, setFilteredFeatures ] = useState([]);
	const [ error, setError ] 											= useState(null);
	const [ loading, setLoading ] 									= useState(false);


	// On mount, fetch all the available tags
	useEffect( () => {
		axios.get(
			`http://cs-mock-timeseries-api.azurewebsites.net/api/Tag`
		).then( res => {
			setTags( res.data );
		}).catch( err => {
			console.log( err.message );
		});
	}, [ setTags ] )

	// onSubmit, fetch the data to display. If no TagID is selected, display error
	const fetchData = e => {
		e.preventDefault();

		// Validate start and end TS
		if( startTS >= endTS ){
			return setError("Correct Date Range: start must be before end");
		}

		// Validate that user has selected Tag to analyze
		if( tagId === null ){
			return setError("Please select a Tag");
		}

		setError(null);
		setLoading(true);
		
		axios.get(
			`http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/${tagId}?startTS=${startTS}&endTS=${endTS}`
		).then( res => {
			setTimeSeriesData( res.data );
			setLoading(false);
		}).catch( err => {
			console.log( err );
			setError("Something went wrong with the search.");
			setLoading(false);
		});
	};

	// Make a new array to push tag features into
	let featuresArray = [];

	// Push all features in tags into features Array
	tags.map( tag => tag.features.map( feature => featuresArray.push( feature)));

	// Return a new array of non-duplicate features
	let uniqueFeaturesArray = [ ...new Set( featuresArray )];

	// Filter tag function adds the feature to a list of features if it isn't already in there, and removes it if it is
	const filterTag = feature => {
		let updatedFilterFeatures = [ ...filteredFeatures ];
		let featureIndex = updatedFilterFeatures.indexOf(feature);

		featureIndex === -1 ?
		updatedFilterFeatures.push(feature) :
		updatedFilterFeatures.splice( featureIndex, 1 );

		setFilteredFeatures( updatedFilterFeatures );
	}

	//Map through tags and their features. If a feature of a tag appears in the filteredFeatures array, add it to remove it from displayTags array
	let displayedTags = [ ...tags ]

	tags.map( ( tag, i, tags ) => {
		// For each tag, compare the tag's features to those in the fileredFeatures array
		tag.features.map( feature => {
			if ( filteredFeatures.indexOf(feature) !== -1 ){
				return displayedTags.splice( displayedTags.indexOf(tag), 1 );
			}
			return null;
			}
		)
		return null;
	})


	// ClassName variables based on state
	const filtered = "filtered";
	const notFiltered = "notFiltered";
	const selectedTag = "selectedTag";
	const unselectedTag = "unselectedTag";


	return(
		<form 
			onSubmit={ fetchData }
			className="time-series-form"
		>
			<div className="button-message-container">
				<button type='submit'>View Time Series Data</button>
				{ error &&
					<div className="error">
						<h3>{error}</h3>
					</div>
				}
				{ loading &&
					<div className="loading">
						<h3>Loading Data...</h3>
					</div>
				}
			</div>

			<div className="date-container">
				<h3>Select Date Range</h3>
				<label htmlFor="startDate">Start</label>
				<input 
					id="startDate" 
					type="date" 
					placeholder="Start Date"
					min="2019-08-15"
					max="2019-09-29"
					value={ startTS }
					onChange={ e => setStartTS( e.target.value ) }
				/>
				
				<label htmlFor="endDate">End</label>
				<input 
					id="endDate" 
					type="date" 
					placeholder="End Date"
					value={ endTS }
					min="2019-08-16"
					max="2019-09-30"
					onChange={ e => setEndTS( e.target.value ) }
				/>
			</div>

			<div className="tag-container">
				<h3>Select Tag to Analyze</h3>
				<ul>
					{ displayedTags.map( tag => 
						<li 
							key={ tag.label }
							onClick={ () => setTagId( tag.tagId )}
							className={ tag.tagId === tagId ? selectedTag : unselectedTag }
						>{ tag.label }</li>
					)}
				</ul>
			</div>
			
			<div className="filter-container">
				<h3>Filter Tag by Features</h3>
				<ul>
					{ uniqueFeaturesArray.map( feature => 
						<li
							onClick={ () => filterTag( feature ) }
							key={ feature }
							className={ filteredFeatures.indexOf(feature) !== -1 ? filtered : notFiltered }
						>
							{ feature }
						</li>
					) }
				</ul>
			</div>
		</form >
	);
}

export default Form;