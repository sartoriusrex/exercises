import React from 'react';
import CanvasJSReact from './assets/canvasjs.react';
const { CanvasJSChart } = CanvasJSReact;

const Graph = ({
	timeSeriesData,
	tags,
	tagId,
}) => {
		var data = []; //array to actually render data
		var dataSeries = {  //config object for the graph
			type: "line",
			xValueFormatString: "MMM D, hh:mm tt" //i.e. Aug 04, 02:33 pm
		};
		var dataPoints = []; //will also be part of the configobject for the graph

		// Update Graph title based on selected Tag 
		// If no tag is selected, tag is Null
		// If there is a tag Id, cross-reference it with the tags array and grab the matching label
		let displayedTag = tagId && tags.filter( tag => tag.tagId === tagId )[0].label;


		// Tags 2 and 3 have boolean data, and thus need to display different Y axis
		//In each map function (boolean or not), we map through each data point and  push into our (empty) dataPoints array an object with x and y keys that correspond to the data we get from our time series: a value at a date-time
		if( tagId && ( tagId === "Tag2" || tagId === "Tag3")){
			timeSeriesData.map( data => {
				let y = ( data.value === true || data.value === "On" ) ? 1 : 0 ;
				let x = new Date( data.observationTS );

				dataPoints.push({
					x: x,
					y: y
				})

				return null;
			})
		} else {
			timeSeriesData.map( data => {
				let y = data.value;
				let x = new Date( data.observationTS );

				dataPoints.push({
					x: x,
					y: y
				})

				return null;
			})
		}

		// Update y Axis title depending on selected Tag
		let yAxisTitle;

		if ( tagId === "Tag2" ) {
			yAxisTitle = "True (1) or False ( 0 )";
		} else if ( tagId === "Tag3" ){
			yAxisTitle = "On (1) or Off (0)"
		} else if ( tagId === "Tag1") {
			yAxisTitle = "Power"
		} else {
			yAxisTitle = "Voltage"
		}

		//We populate the dataSeries with all of our datapoints and push the data into the data array, for use in rendering
		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);
		
		const options = {
			theme: "light2",
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: displayedTag //dynamic, based on tagId
			},
			axisY: {
				title: yAxisTitle, //dynamic, also based on tagId
				includeZero: false
			},
			axisX: {
				title: "Date" //Y may change, but X is always the same date range
			},
			data: data //the same data array we pushed all of our datapoints into earlier.
		}

	return(
		<div>
			<CanvasJSChart 
				options={ options }
			/>
		</div>
	);
}

export default Graph;