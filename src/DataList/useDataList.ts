import { useEffect, useState } from "react";

const useDataList = ({ pageNumber }) => {
  const [list, setList] = useState(() => {
    //TODO: check for null scenario on localStorage
    const localList = JSON.parse(localStorage.getItem('githubList')) || [];
    console.log('local list = ', localList);
    return localList;
  });
  const [loading, setLoading] = useState(false);

  const fetchUrl = `https://api.github.com/orgs/mozilla/members?page=${pageNumber}`;

  useEffect(() => {
    const fetchList = async () => {
      const listResponse = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const listData = await listResponse.json();
      console.log('listData ', listData);
      const userNames = listData.map(user => user.login);
      const updatedList = [...list, ...userNames];
      setList(updatedList);
      localStorage.setItem('githubPageNumber', pageNumber);
      localStorage.setItem('githubList', JSON.stringify(updatedList));
      setLoading(false);
    }

    if (loading) {
      return;
    }

    setLoading(true);
    fetchList();
  }, [pageNumber]);

  return { list, loading };
};

export default useDataList