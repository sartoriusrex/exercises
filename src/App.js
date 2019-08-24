import React, { useState } from 'react';
import "./App.css";

import Form from './Form';
import Graph from './Graph';

function App() {
  const [ timeSeriesData, setTimeSeriesData ] = useState([]);
  const [ tags, setTags ] 											= useState([]);
  const [ tagId, setTagId ]												= useState(null);
	const [ startTS, setStartTS ] 									= useState("2019-08-15");
	const [ endTS, setEndTS ] 											= useState("2019-09-30");
  
  return (
    <div className="App">
      <h1>View Time Series Data</h1>
      <Form 
        setTimeSeriesData={ setTimeSeriesData } 
        tags={ tags }
        setTags={ setTags }
        tagId={ tagId }
        setTagId={ setTagId }
        startTS={ startTS }
        setStartTS={ setStartTS }
        endTS={ endTS }
        setEndTS={ setEndTS }
      />
      <Graph
        timeSeriesData={ timeSeriesData } 
        tags={ tags }
        tagId={ tagId }
        startTS={ startTS }
        endTS={ endTS }
      />
    </div>
  );
}

export default App;
