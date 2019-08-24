import React from 'react';
import CanvasJSReact from './assets/canvasjs.react';
const { CanvasJSChart } = CanvasJSReact;

const Graph = ({
	timeSeriesData,
	tags,
	tagId,
	startTS,
	endTS,
}) => {
		var data = [];
		var dataSeries = { 
			type: "line",
			xValueFormatString: "MMM D, hh:mm tt"
		};
		var dataPoints = [];

		// Update Graph title based on selected Tag 
		// If no tag is selected, tag is Null
		// If there is a tag Id, cross-reference it with the tags array and grab the matching label
		let displayedTag = tagId && tags.filter( tag => tag.tagId === tagId )[0].label;


		// 
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

		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);
		
		const options = {
			theme: "light2",
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: displayedTag
			},
			axisY: {
				title: yAxisTitle,
				includeZero: false
			},
			axisX: {
				title: "Date"
			},
			data: data
		}

	return(
		<div>
			<CanvasJSChart 
				options={ options }
			/>
		</div>
	)
}

export default Graph;