import React, { useEffect, useState } from "react";
import useDataList from "./useDataList";
import { useIntersectionObserver } from "usehooks-ts";

const Footer = ({onScreenCallback, loading = false}) => {
  const {isIntersecting, ref} = useIntersectionObserver();

  useEffect(() => {
    if(isIntersecting && !loading) {
      onScreenCallback();
    }
  }, [isIntersecting, loading]);

  return <p ref={ref}>LOADING...</p>;
}

/*
fetch data for page 1
set loading to false

*/

const DataList = () => {
  const [pageNumber, setPageNumber] = useState(() => {
    const localPageNumber = localStorage.getItem('githubPageNumber') || 1
    console.log('local page number = ', localPageNumber);
    return localPageNumber;
  });
  const {list, loading} = useDataList({pageNumber});

  const updatePageNumber = () => {
    setPageNumber(prev => prev + 1);
  }

  return (<div>
  <ul>
    {list.map((username) => <li>{username}</li>)}
  </ul>
  <Footer loading={loading} onScreenCallback={updatePageNumber}/>
  </div>)
}

export default DataList;