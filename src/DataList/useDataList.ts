import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

const useDataList = () => {
  const { isIntersecting, ref: infiniteScrollRef } = useIntersectionObserver();
  const [pageNumber, setPageNumber] = useState(() => {
    const localPageNumber = Number(localStorage.getItem('githubPageNumber')) || 1
    console.log('local page number = ', localPageNumber);
    return localPageNumber;
  });

  const [list, setList] = useState(() => {
    const localList = JSON.parse(localStorage.getItem('githubList')) || [];
    console.log('local list = ', localList);
    return localList;
  });
  const [loading, setLoading] = useState(false);

  const fetchUrl = `https://api.github.com/orgs/mozilla/members?page=${pageNumber}`;
  const fetchList = async () => {
    setLoading(true);
    const listResponse = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer tokenHere` //got rate limited, had to use token
      }
    });
    const listData = await listResponse.json();
    console.log('listData ', listData);
    const userNames = listData.map(user => user.login);
    const updatedList = [...list, ...userNames];
    const updatedPageNumber = pageNumber + 1;
    setList(updatedList);
    setPageNumber(updatedPageNumber);
    localStorage.setItem('githubPageNumber', updatedPageNumber);
    localStorage.setItem('githubList', JSON.stringify(updatedList));
    setLoading(false);
  }

  // fetch initial list
  useEffect(() => {
    if (loading) {
      return;
    }

    if (pageNumber === 1) {
      fetchList();
    }
  }, []);

  // update list whenever we reach the end
  useEffect(() => {
    if (loading) {
      return;
    }
    if (isIntersecting) {
      fetchList();
    }
  }, [isIntersecting])

  return { list, loading, infiniteScrollRef };
};

export default useDataList