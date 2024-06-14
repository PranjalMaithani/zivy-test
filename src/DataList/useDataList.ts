import { useEffect, useState } from "react";

const useDataList = ({ pageNumber }) => {
  const [list, setList] = useState([]);
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
      const userNames = listData.map(user => user.login)
      setList(prev => [...prev, ...userNames])
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