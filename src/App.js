import React, { useState } from 'react';
import "./App.css";

import Form from './Form';
import Graph from './Graph';

function App() {
  const [ timeSeriesData, setTimeSeriesData ] = useState([]);
  const [ tags, setTags ] 										= useState([]);
  const [ tagId, setTagId ]										= useState(null);
  
  return (
    <div className="App">
      <h1>View Time Series Data</h1>
      <Form 
        setTimeSeriesData={ setTimeSeriesData } 
        tags={ tags }
        setTags={ setTags }
        tagId={ tagId }
        setTagId={ setTagId }
      />
      <Graph
        timeSeriesData={ timeSeriesData } 
        tags={ tags }
        tagId={ tagId }
      />
    </div>
  );
}

export default App;
