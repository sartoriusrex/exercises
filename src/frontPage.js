import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './frontPage.css';

export default () => {
	const [ tags, setTags ] 										= useState([]);
	const [ filteredFeatures, setFilteredFeatures ] = useState([]);
	const [ tagId, setTagId ]										= useState(null);
	const [ startTS, setStartTS ] 							= useState("2019-08-15");
	const [ endTS, setEndTS ] 									= useState("2019-09-30");
	const [ error, setError ] 									= useState(null);
	const [ loading, setLoading ] 							= useState(false);


	// On mount, fetch all the available tags
	useEffect( () => {
		axios.get(
			`http://cs-mock-timeseries-api.azurewebsites.net/api/Tag`
		).then( res => {
			setTags( res.data );
		}).catch( err => {
			console.log( err.message );
		});
	}, [] )

	// onSubmit, fetch the data to display. If no TagID is selected, display error
	const fetchData = e => {
		e.preventDefault();

		if( tagId === null ){
			return setError("Please select a Tag");

		} else {
			setError(null);
			setLoading(true);
			
			axios.get(
				`http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/${tagId}?startTS=${startTS}&endTS=${endTS}`
			).then( res => {
				console.log( res.data );
				setLoading(false);
			}).catch( err => {
				console.log( err );
				setError("Something went wrong with the search.");
				setLoading(false);
			});
		}
	};

	// Make a new array to push tag features into
	let featuresArray = [];

	// Push all features in tags into features Array
	tags.map( tag => tag.features.map( feature => featuresArray.push( feature)));

	// Return a new array of non-duplicate features
	let uniqueFeaturesArray = [ ...new Set( featuresArray )];

	// Filter tag function adds the feature list of features if it isn't already in there, and removes it if it is
	const filterTag = feature => {
		let updatedFilterFeatures = [ ...filteredFeatures ];

		updatedFilterFeatures.indexOf(feature) === -1 ?
		updatedFilterFeatures.push(feature) :
		updatedFilterFeatures.splice( feature, 1 );

		setFilteredFeatures( updatedFilterFeatures )
	}

	const filtered = "filtered";
	const notFiltered = "notFiltered";
	const selectedTag = "selectedTag";
	const unselectedTag = "unselectedTag";


	return(
		<form 
			onSubmit={ fetchData }
			className="time-series-form"
		>
			{ error &&
				<div>
					<h1>{error}</h1>
				</div>
			}
			{ loading &&
				<div>
					<h1>Loading Data...</h1>
				</div>
			}

			<h2>Select Tag</h2>
			<ul>
				{ tags.map( tag => 
					<li 
						key={ tag.label }
						onClick={ () => setTagId( tag.tagId )}
						className={ tag.tagId === tagId ? selectedTag : unselectedTag }
					>{ tag.label }</li>
				)}
			</ul>

			<h2>Filter Tag by Features</h2>
			<ul>
				{ uniqueFeaturesArray.map( feature => 
					<li
						onClick={ () => filterTag( feature ) }
						key={ feature }
						className={ filteredFeatures.indexOf(feature) === -1 ? notFiltered : filtered }
					>
						{ feature }
					</li>
				) }
			</ul>

			<h2>Select Date Range</h2>
			<label htmlFor="startDate">Start Date</label>
			<input 
				id="startDate" 
				type="date" 
				placeholder="Start Date"
				min={ startTS }
				max={ endTS }
				value={ startTS }
				onChange={ e => setStartTS( e.target.value ) }
			/>
			
			<label htmlFor="endDate">End Date</label>
			<input 
				id="endDate" 
				type="date" 
				placeholder="End Date"
				value={ endTS }
				min={ startTS }
				max={ endTS }
				onChange={ e => setEndTS( e.target.value ) }
			/>

			<button type='submit'>Search Time Series Data</button>
		</form >
	);
}