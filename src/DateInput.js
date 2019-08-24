import React from 'react';

const DateInput = ({ timeStamp, label, setFunction }) => {
	return(
		<>
			<label 
				htmlFor={ label === "Start" ? "startDate" : "endDate" }
			>
				{ label }
			</label>
			<input 
				id={ label === "Start" ? "startDate" : "endDate" } 
				type="date" 
				min={ label === "Start" ? "2019-08-15" : "2019-08-16" }
				max={ label === "Start" ? "2019-09-29" : "2019-09-30" }
				value={ timeStamp }
				onChange={ e => setFunction( e.target.value ) }
			/>
		</>
	)
}

export default DateInput;