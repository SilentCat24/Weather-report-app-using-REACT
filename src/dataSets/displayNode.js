import React, { useEffect , useState } from 'react';

const DisplayNode=()=> {

  const [dataSet , setDataSet] = useState([])


    useEffect(() => {
      fetch(`http://127.0.0.1:3000/users/`)
      .then((response) => response.json())
      .then((actualData) => setDataSet(actualData))
      .catch((err) => {
        console.log(err.message);
      });
    }, []);

    return (
      <div className="App">
        <p>Hello, world!</p>
        {dataSet.map((val , i)=>{
          return (
            <h1 key={i}>{val.name}</h1>
          )
        })}
        </div>
    )
  }

  export default DisplayNode