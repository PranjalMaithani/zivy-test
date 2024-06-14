import React from "react";
import useDataList from "./useDataList";

/*
fetch data for page 1
set loading to false

*/

const DataList = () => {
  
  const {list, infiniteScrollRef} = useDataList();

  return (<div>
  <ul>
    {list.map((username) => <li key={username}>{username}</li>)}
  </ul>
  <div ref={infiniteScrollRef}>LOADING...</div>
  </div>)
}

export default DataList;