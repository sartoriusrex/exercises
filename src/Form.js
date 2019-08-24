import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Form.css';
import { fetchData } from './fetch';
import Message from './Message';
import DateInput from './DateInput';

const Form = ({ 
	setTimeSeriesData, 
	tags, 
	setTags, 
	tagId, 
	setTagId, 
	}) => {
	const [ filteredFeatures, setFilteredFeatures ] = useState([]);
	const [ error, setError ] 											= useState(null);
	const [ loading, setLoading ] 									= useState(false);
	const [ startTS, setStartTS ] 									= useState("2019-08-15");
	const [ endTS, setEndTS ] 											= useState("2019-09-30");


	// On mount, fetch all the available tags
	useEffect( () => {
		axios.get(
			`http://cs-mock-timeseries-api.azurewebsites.net/api/Tag`
		).then( res => {
			setTags( res.data );
		}).catch( err => {
			console.log( err.message );
			setError("Sorry, we couldn't find any tags");
		});
	}, [ setTags ] );


	// Make a new array to push tag features into
	let featuresArray = [];

	// Push all features in tags into features Array
	tags.map( tag => tag.features.map( feature => featuresArray.push( feature)));

	// Return a new array of non-duplicate features
	let uniqueFeaturesArray = [ ...new Set( featuresArray )];

	// Filter tag function adds the feature to a list of features if it isn't already in there, and removes it if it already is.
	const filterTag = feature => {
		let updatedFilterFeatures = [ ...filteredFeatures ]; //keep data immutable - make a copy of the filteredFeatures array
		let featureIndex = updatedFilterFeatures.indexOf(feature); //find the index of the feature inside the new Array

		featureIndex === -1 ? //Is the feature not present?
		updatedFilterFeatures.push(feature) : //If not, push it into the array
		updatedFilterFeatures.splice( featureIndex, 1 ); //otherwise remove it

		setFilteredFeatures( updatedFilterFeatures ); //update the the filteredFeatures array with the new array
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

	// ClassName variables based on state. They are styled from the corresponding css file
	const filtered = "filtered";
	const notFiltered = "notFiltered";
	const selectedTag = "selectedTag";
	const unselectedTag = "unselectedTag";


	return(
		<form 
			onSubmit={ e => 
				fetchData( e, setError, setLoading, setTimeSeriesData, startTS, endTS, tagId ) //fetchData will prevent the browser default behavior, setErrors if they exist, update a loading state, and use the tagId, startTS, and EndTS to fetch data. With the the response, it will update the timeSeries Data.
			}
			className="time-series-form"
		>
			<div className="button-message-container">
				<button type='submit'>View Time Series</button>
				<Message error={ error } loading={ loading } />
				{/* If there's an error or if data is loading, show that status to the user */}
			</div>

			<div className="date-container">
				<h3>Select Date Range</h3>
				<DateInput 
					timeStamp={ startTS } 
					label="Start"
					setFunction={ setStartTS }
				/>
				
				<DateInput 
					timeStamp={ endTS } 
					label="End"
					setFunction={ setEndTS }
				/>
			</div>

			<div className="tag-container">
				<h3>Select Tag to Analyze</h3>
				<ul>
					{ displayedTags.map( tag => 
						<li 
							key={ tag.label }
							data-testid="tag"
							onClick={ () => setTagId( tag.tagId )}
							className={ tag.tagId === tagId ? selectedTag : unselectedTag } //Clicking on the tag updates the tagId state. If the tagId in state matches the current tagId, style it as if it were selected, otherwise don't
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
							data-testid={"feature-" + feature }
							className={ filteredFeatures.indexOf(feature) !== -1 ? filtered : notFiltered } //Is the feature present in the filteredFeatures array? if it is, style it like it's filtered out (line-through), otherwise it's normal
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