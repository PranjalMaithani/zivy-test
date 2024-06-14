import React, { useState } from "react";
import useDataList from "./useDataList";

const Footer = () => {
  return <p>LOADING...</p>
}

const DataList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {list, loading} = useDataList({pageNumber});

  return (<div>
  <ul>
    {list.map((username) => <li>{username}</li>)}
  </ul>
  <Footer />
  </div>)
}

export default DataList;