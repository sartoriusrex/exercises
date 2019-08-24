import React from 'react';

import "./Message.css";

const Message = ({error, loading}) => {
	return(
		<>
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
		</>
	)
}

export default Message;